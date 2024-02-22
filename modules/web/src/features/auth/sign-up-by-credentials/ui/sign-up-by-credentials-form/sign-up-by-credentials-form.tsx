"use client";

import { FormEvent, useRef } from "react";
import { useSignUp } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";

export function SignUpByCredentialsForm(): JSX.Element {
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

        const res = await trigger({ email, password, name, nickname });

        onAfterFetch(["Signed up successfully", "Failed to sign up"], res.status);
    }

    return (
        <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
            <input className="border rounded-lg border-slate-700 p-2" type="text" name="name" required minLength={2} id="name" placeholder="Name" ref={nameRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="text" name="nickname" required minLength={2} id="nickname" placeholder="Nickname" ref={nicknameRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="email" name="email" required id="email" minLength={2} placeholder="Email" ref={emailRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="password" name="password" required minLength={2} id="password" placeholder="Password" ref={passwordRef} />
            <button className="bg-slate-700 text-white w-fit mx-auto p-2 rounded-lg font-medium" type="submit">submit</button>
        </form>
    );
}
