"use client";

import { useState } from "react";
import { useSignUp } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { maxFileSize } from "@/shared/const";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProfilePhoto } from "./ProfilePhoto";
import axios from "axios";
import { Button } from "@/shared/ui";

export interface RegistrationData {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export function SignUpByCredentialsForm(): JSX.Element {
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoVerified, setProfilePhotoVerified] =
        useState<boolean>(false);

    const { trigger, isMutating } = useSignUp();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.AUTH_ROUTES.whoami],
        redirect: "/",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<RegistrationData>({
        defaultValues: {
            name: "",
            surname: "",
            nickname: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    function checkProfilePhoto(profilePhoto: File): void {
        axios
            .post("https://httpbin.org/post", { profilePhoto })
            .then((response) => {
                console.log(response);
                if (response.status === 200) { // change the response.status to the confirmation response from the server
                    setProfilePhotoVerified(true);
                    setProfilePhoto(profilePhoto);
                }
            });
    }

    const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
        const {
            name,
            surname,
            nickname,
            email,
            password,
            passwordConfirmation,
        }: RegistrationData = data;

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("nickname", nickname);
        if (profilePhoto) {
            formData.append("picture", profilePhoto);
        }
        const res = await trigger(formData);

        onAfterFetch(
            ["Signed up successfully", (res as unknown as { message: string })?.message ?? "Failed to sign up"],
            res.status
        );
    };

    function onUpload(e: React.ChangeEvent<HTMLInputElement>): void {
        if (!e.target.files) {
            return;
        }

        const file = e.target.files[0];

        if (file.size > maxFileSize) {
            return;
        }

        setProfilePhoto(file);
    }

    return (
        <div className="w-full">
            <form
                className="flex flex-col justify-center items-center w-full gap-5 lg:flex-row lg:justify-end lg:items-start lg:pt-15"
                onSubmit={handleSubmit(onSubmit)}
            >
                <ProfilePhoto profilePhoto={profilePhoto} onChange={onUpload} />

                <div className="flex flex-col w-full gap-4 sm:mt-5 sm:w-2/3 md:w-3/5 lg:w-1/2">
                    <h1 className="font-bold text-center text-5xl pb-3 lg:text-left lg:text-6xl lg:pb-6">
                        Sign up
                    </h1>
                    <input
                        {...register("name", { required: true, minLength: 4 })}
                        type="text"
                        placeholder="Name"
                        className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96`}
                    />
                    <input
                        {...register("surname", { required: true })}
                        type="text"
                        placeholder="Surname"
                        className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96`}
                    />
                    <input
                        {...register("nickname", { required: true })}
                        type="text"
                        placeholder="Nickname"
                        className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96`}
                    />
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="E-mail"
                        className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96`}
                    />
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Password"
                        className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96`}
                    />
                    <input
                        {...register("passwordConfirmation", {
                            required: true,
                        })}
                        type="password"
                        placeholder="Password"
                        className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96`}
                    />
                    <Button
                        isLoading={isMutating}
                        className="bg-slate-50 text-slate-700 text-lg w-full p-4 sm:text-xl sm:p-4 lg:w-96 sm:mt-2 lg:mt-5 ease-in-out duration-300"
                        type="submit"
                    >
                   Create account
                    </Button>
                </div>
            </form>
        </div>
    );
}
