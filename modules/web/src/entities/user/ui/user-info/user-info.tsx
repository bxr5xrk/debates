"use client";

import { UserFormData } from "../..";
import { useState } from "react";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { onUpload, validations } from "@/shared/lib";
import Image from "next/image";
import { Button, InputGroup } from "@/shared/ui";
import { useFormInit } from "./hooks/use-form-init";
import { useDirty } from "./hooks/use-dirty";
import { getFormData } from "./lib/get-form-data";

export function UserInfo(): JSX.Element {
    const { data, register, control, errors, handleSubmit, isMutating, trigger, watch } = useFormInit();
    const picture = data?.data.picture;
    const [file, setFile] = useState<File | null>(null);
    const [isDirty] = useDirty<UserFormData>(control, watch, isMutating, file);
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.USER.me] });

    async function onSubmit(data: UserFormData): Promise<void> {
        control._disableForm(true);
        const formData = getFormData(data, file);
        const res = await trigger(formData);

        onAfterFetch(["User updates successfully", res?.data.message ?? "Something went wrong"], res.status);

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
                <InputGroup label="Name" errorMessage={errors['name']?.message}>
                    <InputGroup.Input {...register("name", { ...validations.required })} placeholder="Name" />
                </InputGroup>
                <InputGroup label="Nickname" errorMessage={errors['nickname']?.message}>
                    <InputGroup.Input {...register("nickname", { ...validations.required })} placeholder="Nickname" />
                </InputGroup>
                <InputGroup label="Email" errorMessage={errors['email']?.message}>
                    <InputGroup.Input {...register("email", { ...validations.required })} placeholder="Email" type="email" />
                </InputGroup>
                {isDirty && <Button isLoading={isMutating} type="submit">save changes</Button>}
            </form>
        </div>
    );
}
