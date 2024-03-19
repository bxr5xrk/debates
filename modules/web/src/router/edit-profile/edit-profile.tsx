"use client";

import { AccountSettings } from "@/entities/user";
import { Page } from "@/shared/layout/page";
import { ComponentContainer } from "@/shared/ui";

export function EditProfilePage(): JSX.Element {
    return (
        <Page className="w-full h-full max-w-screen-2xl mx-auto">
            <ComponentContainer className="flex justify-center items-center">
                <AccountSettings />
            </ComponentContainer>
        </Page>
    );
}
