"use client";

import { FormEvent, useRef, useState } from "react";
import { useSignUp } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import Image from "next/image";
import { maxFileSize } from "@/shared/const";

export function SignUpByCredentialsForm(): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);
    const { trigger } = useSignUp();
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.AUTH_ROUTES.whoami], redirect: "/" });

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";
        const name = nameRef.current?.value ?? "";
        const nickname = nicknameRef.current?.value ?? "";

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("nickname", nickname);
        if (file) {
            formData.append("picture", file);
        }
        const res = await trigger(formData);

        onAfterFetch(["Signed up successfully", "Failed to sign up"], res.status);
    }

    function onUpload(e: React.ChangeEvent<HTMLInputElement>): void {
        if (!e.target.files) {
            return;
        }

        const file = e.target.files[0];

        if (file.size > maxFileSize) {
            return;
        }

        setFile(file);
    }

    return (
        <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
            {file && <Image
                src={URL.createObjectURL(file)}
                alt="Profile image"
                width={200}
                height={200}
            />}
            <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={onUpload}
            />
            <input className="border rounded-lg border-slate-700 p-2" type="text" name="name" required minLength={2} id="name" placeholder="Name" ref={nameRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="text" name="nickname" required minLength={2} id="nickname" placeholder="Nickname" ref={nicknameRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="email" name="email" required id="email" minLength={2} placeholder="Email" ref={emailRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="password" name="password" required minLength={2} id="password" placeholder="Password" ref={passwordRef} />
            <button className="bg-slate-700 text-white w-fit mx-auto p-2 rounded-lg font-medium" type="submit">submit</button>
        </form>
    );
}
