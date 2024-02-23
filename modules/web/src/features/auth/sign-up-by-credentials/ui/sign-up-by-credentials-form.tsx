"use client";

import { useState, useEffect } from "react";
import { useSignUp } from "../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { ProfilePhoto } from "./ProfilePhoto";
import axios from "axios";
import { Arvo } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";

const arvo = Arvo({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export interface RegistrationData {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const isEmailValid = (email: string): boolean => !!email.length;

const checkRegistrationData = (registrationData: RegistrationData): boolean => {
    if (!isEmailValid(registrationData.email)) {
        console.log("email");
        return false;
    }

    if (!registrationData.password.trim()) {
        console.log("password missed");
        return false;
    }

    if (
        !registrationData.name.trim() &&
        !registrationData.surname.trim() &&
        !registrationData.nickname.trim()
    ) {
        console.log("name");
        return false;
    }

    if (registrationData.password !== registrationData.passwordConfirmation) {
        console.log("password");
        return false;
    }

    return true;
};

export function SignUpByCredentialsForm(): JSX.Element {
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoVerified, setProfilePhotoVerified] = useState<boolean>(false);

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
        axios.post("https://httpbin.org/post", { profilePhoto }).then((response) => {
            console.log(response);
            if (response.status === 200) { // change the status to the confirmation response from the server
                setProfilePhotoVerified(true);
                setProfilePhoto(profilePhoto);
            }
        });
    }

    const onSubmit: SubmitHandler<RegistrationData> = (data) => {
        if (!checkRegistrationData(data)) {
            return;
        }
            

        axios.post("https://httpbin.org/post", { profilePhoto, ...data }).then((response) => {
            reset();
            console.log(response.status);
            console.log(response.data);
        });
        console.log(data);
    };

    return (
        <div className={arvo.className}>
            <form
                className="flex flex-col justify-center items-center w-full gap-5 lg:flex-row lg:justify-end lg:items-start lg:pt-15"
                onSubmit={handleSubmit(onSubmit)}
            >
                <ProfilePhoto profilePhoto={profilePhoto} checkProfilePhoto={checkProfilePhoto} profilePhotoVerified={profilePhotoVerified} />

                <div className="flex flex-col w-full gap-4 sm:mt-5 lg:w-1/2">
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
                    <button
                        className="bg-slate-50 text-slate-700 border-solid border-2 border-slate-700 text-lg w-full p-4 rounded-full font-medium sm:mt-10 sm:text-xl sm:p-4 lg:w-96 lg:mt-10 ease-in-out duration-300 hover:bg-slate-700 hover:text-slate-50"
                        type="submit"
                    >
                        Create account
                    </button>
                </div>
            </form>
        </div>
    );
}
