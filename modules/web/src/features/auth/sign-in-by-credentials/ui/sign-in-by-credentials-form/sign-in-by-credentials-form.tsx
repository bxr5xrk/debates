"use client";

import { FormEvent, useRef } from "react";
import { useSignIn } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";

export function SignInByCredentialsForm(): JSX.Element {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { trigger } = useSignIn();
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.AUTH_ROUTES.whoami], redirect: "/dashboard" });

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";

        const res = await trigger({ email, password });

        onAfterFetch(["Signed in successfully", "Failed to sign in"], res.status);
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" required id="email" minLength={2} placeholder="Email" ref={emailRef} />
            <input type="password" name="password" required minLength={2} id="password" placeholder="Password" ref={passwordRef} />
            <button type="submit">submit</button>
        </form>
    );
}