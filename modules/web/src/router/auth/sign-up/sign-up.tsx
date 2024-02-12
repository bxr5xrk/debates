import { SignUpByCredentialsForm } from "@/features/auth";
import { Page } from "@/shared/layout/page";

export function SignUpPage(): JSX.Element {
   
    return (
        <Page>
      Sign Up
            <SignUpByCredentialsForm />
        </Page>
    );
}