import { SignInByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";

export function SignInPage(): JSX.Element {

    return (
        <Page className="flex items-center justify-center">
            <div className="max-w-64 p-4 border border-slate-700 rounded-lg">
                <SignInByCredentialsForm />
            </div>
        </Page>
    );
}