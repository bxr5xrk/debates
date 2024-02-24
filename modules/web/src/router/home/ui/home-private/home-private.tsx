"use client";

import { UserInfo } from "@/entities/user";
import { Page } from "@/shared/layout/page";

export function HomePrivate(): JSX.Element {
    return (
        <Page>
            <UserInfo />
        </Page>
    );
}