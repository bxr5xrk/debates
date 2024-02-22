"use client";

import { FormEvent, useRef } from "react";
import { useSignIn } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { cl } from "@/shared/lib/cl";

type SignInByCredentialsFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export function SignInByCredentialsForm(props: SignInByCredentialsFormProps): JSX.Element {
    const { className, ...meta } = props;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { trigger } = useSignIn();
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.AUTH_ROUTES.whoami], redirect: "/" });

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";

        const res = await trigger({ email, password });

        onAfterFetch(["Signed in successfully", "Failed to sign in"], res.status);
    }

    return (
        <form className={cl("flex flex-col w-full gap-2", className)} onSubmit={onSubmit} {...meta}>
            <input className="border rounded-lg border-slate-700 p-2" type="email" name="email" required id="email" minLength={2} placeholder="Email" ref={emailRef} />
            <input className="border rounded-lg border-slate-700 p-2" type="password" name="password" required minLength={2} id="password" placeholder="Password" ref={passwordRef} />
            <button className="bg-slate-700 text-white w-fit mx-auto p-2 rounded-lg font-medium" type="submit">submit</button>
        </form>
    );
}