import { SignUpByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";
import { Arvo } from "next/font/google";
import Link from "next/link";

const arvo = Arvo({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export function SignUpPage(): JSX.Element {
    return (
        <Page className={`w-full ${arvo.className}`}>
            <div className="flex flex-col items-center max-w-full lg:w-full p-4">
                <SignUpByCredentialsForm />
                <div className="flex flex-col items-center gap-3 mt-5 sm:flex-row lg:ml-96">
                    <p>Have an account?</p>
                    <Link className="text-sky-400 font-bold" href="/sign-in">
                        Log In
                    </Link>
                </div>
            </div>
        </Page>
    );
}
