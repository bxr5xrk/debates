"use client";

import { AccountSettings } from "@/entities/user";
import { Page } from "@/shared/layout/page";

export function EditProfilePage(): JSX.Element {
    return (
        <Page>
            <AccountSettings />
        </Page>
    );
}