"use client";

import { UserFormData } from "../..";
import { useState } from "react";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { onUpload, validations } from "@/shared/lib";
import { Button, Input, InputGroup, InputWithLabel } from "@/shared/ui";
import { useFormInit } from "./hooks/use-form-init";
import { useDirty } from "./hooks/use-dirty";
import { getFormData } from "./lib/get-form-data";
import { ProfilePhoto } from "@/shared/ui/profile-photo";

export function UserInfo(): JSX.Element {
    const {
        data,
        register,
        control,
        errors,
        handleSubmit,
        isMutating,
        trigger,
        watch,
    } = useFormInit();
    // const {
    //     data,
    //     register,
    //     control,
    //     errors,
    //     handleSubmit,
    //     isMutating,
    //     trigger,
    //     watch,
    // } = useFormInit();
    const picture = data?.data.picture;
    const [file, setFile] = useState<File | null>(null);
    const [isDirty] = useDirty<UserFormData>(control, watch, isMutating, file);
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.USER.me] });

    const profilePhoto = file ? file : picture ?? null;

    async function onSubmit(data: UserFormData): Promise<void> {
        control._disableForm(true);
        const formData = getFormData(data, file);
        const res = await trigger(formData);

        onAfterFetch(
            [
                "User updates successfully",
                res?.data.message ?? "Something went wrong",
            ],
            res.status
        );
        onAfterFetch(
            [
                "User updates successfully",
                res?.data.message ?? "Something went wrong",
            ],
            res.status
        );

        control._disableForm(false);
    }

    return (
        <div className="border-2 border-slate-700 rounded-md m-4 p-4 w-auto h-5/6 flex">
            {/* <h1>User Info</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center w-full gap-5 lg:flex-row lg:justify-end lg:items-center lg:pt-15"
            >
                <div className="w-full mb-6 lg:flex lg:justify-end lg:mr-24 lg:w-4/5">
                    <ProfilePhoto
                        profilePhoto={profilePhoto}
                        setProfilePhoto={setFile}
                    />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-5 lg:items-start">
                    <h1 className="font-bold text-center text-3xl lg:text-left lg:text-4xl lg:pb-6">
                        Edit profile
                    </h1>
                    <InputWithLabel
                        label="Name"
                        htmlFor="name"
                        errorMessage={errors["name"]?.message}
                    >
                        <Input
                            {...register("name", { ...validations.required })}
                            placeholder="Name"
                            id="name"
                        />
                    </InputWithLabel>
                    <InputWithLabel
                        label="Nickname"
                        errorMessage={errors["nickname"]?.message}
                        htmlFor="nickname"
                    >
                        <InputGroup.Input
                            {...register("nickname", {
                                ...validations.required,
                            })}
                            placeholder="Nickname"
                            id="nickname"
                        />
                    </InputWithLabel>
                    <InputWithLabel
                        label="Email"
                        errorMessage={errors["email"]?.message}
                        htmlFor="email"
                    >
                        <InputGroup.Input
                            {...register("email", { ...validations.required })}
                            placeholder="Email"
                            type="email"
                            id="email"
                        />
                    </InputWithLabel>
                    <Button
                        className="w-1/2 sm:w-1/3 lg:w-96 lg:mt-12"
                        isLoading={isMutating}
                        disabled={isDirty ? false : true}
                        type="submit"
                    >
                        save changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
