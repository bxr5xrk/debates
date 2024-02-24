"use client";

import { useLoggedIn } from "@/shared/hooks";
import { HeaderPublic } from "./ui/header-public";
import { HeaderPrivate } from "./ui/header-private";

export function Header(): JSX.Element {
    const isLoggedIn = useLoggedIn();

    if (!isLoggedIn) {
        return (
            <HeaderPublic />
        );
    }

    return (
        <HeaderPrivate />
    );
}