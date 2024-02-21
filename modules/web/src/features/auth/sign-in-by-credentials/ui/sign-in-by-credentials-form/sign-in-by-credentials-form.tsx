"use client";

import { FormEvent, useRef, useState } from "react";
import { useSignIn } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { cl } from "@/shared/lib/cl";
import { LoginFormData } from "./LoginFormData";

type SignInByCredentialsFormProps = React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;

export interface LoginData {
    email: string;
    password: string;
}

export function SignInByCredentialsForm(
    props: SignInByCredentialsFormProps
): JSX.Element {
    const { className, ...meta } = props;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { trigger } = useSignIn();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.AUTH_ROUTES.whoami],
        redirect: "/dashboard",
    });

    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });

    console.table(loginData);

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";

        const res = await trigger({ email, password });

        onAfterFetch(
            ["Signed in successfully", "Failed to sign in"],
            res.status
        );
    }

    return (
        <form
            className={cl(
                "flex flex-col justify-center items-center w-full gap-5 lg:pt-15",
                className
            )}
            onSubmit={onSubmit}
            {...meta}
        >
            <LoginFormData loginData={loginData} setLoginData={setLoginData} />
        </form>
    );
}
