import { SignUpByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";

export function SignUpPage(): JSX.Element {
    return (
        <Page className="flex items-center justify-center">
            <div className="max-w-full lg:w-full p-4">
                <SignUpByCredentialsForm />
            </div>
        </Page>
        
    );
}