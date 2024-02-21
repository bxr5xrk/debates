import { SignInByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";

export function SignInPage(): JSX.Element {

    return (
        <Page className="flex items-center justify-center">
            <div className="max-w-full p-4">
                <SignInByCredentialsForm />
            </div>
        </Page>
    );
}