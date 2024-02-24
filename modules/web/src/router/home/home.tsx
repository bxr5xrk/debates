"use client";

import { HomePrivate } from "./ui/home-private/home-private";
import { HomePublic } from "./ui/home-public/home-public";
import { useLoggedIn } from "@/shared/hooks";

export function HomePage(): JSX.Element {
    const isLoggedIn = useLoggedIn();

    if (!isLoggedIn) {
        return (
            <HomePublic />
        );
    }
    return (
        <HomePrivate />
    );
}