"use client";

import { FormEvent, useRef } from "react";
import { useSignIn } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { cl } from "@/shared/lib/cl";
import { useForm, SubmitHandler } from "react-hook-form";

type SignInByCredentialsFormProps = React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;

export interface LoginData {
    email: string;
    password: string;
}

const isEmailValid = (email: string): boolean => !!email.length;
const checkLoginData = (loginData: LoginData): boolean => {
    if (!isEmailValid(loginData.email)) {
        console.log("email");
        return false;
    }

    if (!loginData.password.trim()) {
        console.log("password missed");
        return false;
    }
    return true;
};

export function SignInByCredentialsForm(
    props: SignInByCredentialsFormProps
): JSX.Element {
    const { className, ...meta } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { trigger } = useSignIn();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.AUTH_ROUTES.whoami],
        redirect: "/",
    });

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        if (!checkLoginData(data)) {
            return;
        }

        const res = await trigger(data);

        onAfterFetch(
            ["Signed in successfully", "Failed to sign in"],
            res.status
        );
    };

    return (
        <form
            className={cl(
                "flex flex-col justify-center items-center w-full gap-5 lg:pt-15",
                className
            )}
            onSubmit={handleSubmit(onSubmit)}
            {...meta}
        >
            <div className="flex flex-col w-full gap-4 sm:mt-5 lg:w-1/2 lg:items-center">
                <h1 className="font-bold text-center text-5xl pb-3 lg:text-6xl lg:pb-6">
                    Sign In
                </h1>
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
                <button
                    className="bg-slate-50 text-slate-700 border-solid border-2 border-slate-700 text-lg w-full p-4 rounded-full font-medium sm:mt-10 sm:text-xl sm:p-4 lg:w-96 sm:mt-2 lg:mt-5 ease-in-out duration-300 hover:bg-slate-700 hover:text-slate-50"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}
