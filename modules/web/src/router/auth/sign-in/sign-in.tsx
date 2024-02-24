import { SignInByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";
import Link from "next/link";
import { Arvo } from "next/font/google";

const arvo = Arvo({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export function SignInPage(): JSX.Element {
    return (
        <Page className={`flex items-center justify-center ${arvo.className}`}>
            <div className="flex flex-col items-center w-full sm:w-80 lg:w-full p-4">
                <SignInByCredentialsForm />
                <div className="flex flex-col items-center gap-3 mt-5 sm:flex-row ">
                    <p>Don&apos;t have an account?</p>
                    <Link className="text-sky-400 font-bold" href="/sign-up">
                        Sign Up
                    </Link>
                </div>
            </div>
        </Page>
    );
}
