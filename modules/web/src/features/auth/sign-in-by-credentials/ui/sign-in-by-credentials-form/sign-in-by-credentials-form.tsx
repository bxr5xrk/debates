"use client";

import { useSignIn } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { cl } from "@/shared/lib/cl";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/shared/ui";

interface SignInByCredentialsFormProps extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
> {
    onSuccess?: VoidFunction
}

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

export function SignInByCredentialsForm(props: SignInByCredentialsFormProps): JSX.Element {
    const { className, onSuccess, ...meta } = props;

    const {
        register,
        handleSubmit,
    } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { trigger, isMutating } = useSignIn();
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
        onSuccess?.();
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
            <div className="flex flex-col w-full gap-4 sm:mt-5 lg:items-center">
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
                <Button
                    isLoading={isMutating}
                    className="bg-slate-50 text-slate-700 text-lg w-full p-4 sm:text-xl sm:p-4 lg:w-96 sm:mt-2 lg:mt-5 ease-in-out duration-300"
                    type="submit"
                >
                    Sign In
                </Button>
            </div>
        </form>
    );
}
