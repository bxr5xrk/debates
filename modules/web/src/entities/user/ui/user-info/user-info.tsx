"use client";

import { UserFormData } from "../..";
import { useState } from "react";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { onUpload, validations } from "@/shared/lib";
import Image from "next/image";
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

        control._disableForm(false);
    }

    return (
        <div>
            <h1>User Info</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {(file || picture) && <Image
                    src={file ? URL.createObjectURL(file) : picture ?? ''}
                    alt="Profile image"
                    width={200}
                    height={200}
                />}
                <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    onChange={(e) => onUpload(e, setFile)}
                />
                <InputWithLabel label="Name" htmlFor="name" errorMessage={errors['name']?.message}>
                    <Input {...register("name", { ...validations.required })} placeholder="Name" id="name" />
                </InputWithLabel>
                <InputWithLabel label="Nickname" errorMessage={errors['nickname']?.message} htmlFor="nickname">
                    <InputGroup.Input {...register("nickname", { ...validations.required })} placeholder="Nickname" id="nickname" />
                </InputWithLabel>
                <InputWithLabel label="Email" errorMessage={errors['email']?.message} htmlFor="email">
                    <InputGroup.Input {...register("email", { ...validations.required })} placeholder="Email" type="email" id="email" />
                </InputWithLabel>
                {isDirty && <Button isLoading={isMutating} type="submit">save changes</Button>}
            </form>
        </div>
    );
}
