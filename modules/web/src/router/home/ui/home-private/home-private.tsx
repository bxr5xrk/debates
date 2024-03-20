"use client";

import { Page } from "@/shared/layout/page";
import { AccountSettings } from "@/entities/user";
import { ComponentContainer } from "@/shared/ui";

export function HomePrivate(): JSX.Element {
    return (
        <Page>
            <ComponentContainer className="flex justify-center items-center">
                <AccountSettings />
            </ComponentContainer>
        </Page>
    );
}