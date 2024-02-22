import { SignUpByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";
import Link from "next/link";

export function SignUpPage(): JSX.Element {
    return (
        <Page className="flex items-center justify-center">
            <div className="max-w-64 p-4 border border-slate-700 rounded-lg">
                <SignUpByCredentialsForm />
                <Link href="/sign-in">
                    Sign In
                </Link>
            </div>
        </Page>
    );
}