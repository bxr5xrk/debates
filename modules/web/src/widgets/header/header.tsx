"use client";

import { useLoggedIn } from "@/shared/hooks";
import { HeaderPublic } from "./ui/header-public";
import { HeaderPrivate } from "./ui/header-private";
import { Loading } from "./ui/loading";

export function Header(): JSX.Element {
    const { isLoading, isLoggedIn } = useLoggedIn();

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (!isLoggedIn) {
        return (
            <HeaderPublic />
        );
    }

    return (
        <HeaderPrivate />
    );
}