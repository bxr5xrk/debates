import { SignInByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";

export function SignInPage(): JSX.Element {

    return (
        <Page>
      Sign In
            <SignInByCredentialsForm />
        </Page>
    );
}