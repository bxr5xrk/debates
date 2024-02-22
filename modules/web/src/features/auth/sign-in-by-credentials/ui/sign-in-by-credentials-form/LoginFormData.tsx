import { Input } from "@/shared/layout/input";
import { LoginData } from "./sign-in-by-credentials-form";

interface LoginFormDataProps {
    loginData: LoginData;
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>
}

export function LoginFormData({
    loginData,
    setLoginData,
}: LoginFormDataProps ): JSX.Element {
    return (
        <div className="flex flex-col w-full gap-4 sm:mt-5 lg:w-1/2 lg:items-center">
            <h1 className="font-bold text-center text-5xl pb-3 lg:text-6xl lg:pb-6">
                Sign In
            </h1>
            <Input
                type={"email"}
                name={"email"}
                id={"email"}
                placeholder={"E-mail"}
                data={loginData}
                setData={setLoginData}
            />
            <Input
                type={"password"}
                name={"password"}
                id={"password"}
                placeholder={"Password"}
                data={loginData}
                setData={setLoginData}
            />
            <button
                className="bg-slate-50 text-slate-700 border-solid border-2 border-slate-700 text-lg w-full p-4 rounded-full font-medium sm:mt-10 sm:text-xl sm:p-4 lg:w-96 lg:mt-10 ease-in-out duration-300 hover:bg-slate-700 hover:text-slate-50"
                type="submit"
            >
                Sign In
            </button>
        </div>
    );
}
