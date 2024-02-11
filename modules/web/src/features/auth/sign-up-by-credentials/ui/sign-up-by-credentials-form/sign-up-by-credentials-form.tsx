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
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.AUTH_ROUTES.whoami], redirect: "/dashboard" });

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";
        const name = nameRef.current?.value ?? "";
        const nickname = nicknameRef.current?.value ?? "";

        const res = await trigger({ email, password, name, nickname });

        onAfterFetch(["Signed up successfully", "Failed to sign in"], res.status);
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" required minLength={2} id="name" placeholder="Name" ref={nameRef} />
            <input type="text" name="nickname" required minLength={2} id="nickname" placeholder="Nickname" ref={nicknameRef} />
            <input type="email" name="email" required id="email" minLength={2} placeholder="Email" ref={emailRef} />
            <input type="password" name="password" required minLength={2} id="password" placeholder="Password" ref={passwordRef} />
            <button type="submit">submit</button>
        </form>
    );
}