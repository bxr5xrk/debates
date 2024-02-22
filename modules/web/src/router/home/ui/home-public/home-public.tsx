"use client";

import { useWhoami } from "@/features/auth";

export function HomePublic(): JSX.Element {
    const { data, isLoading } = useWhoami();
    const isLoggedIn = data?.data?.id;

    if (isLoading) {
        return (
            <></>
        );
    }

    if (isLoggedIn) {
        return (
            <></>
        );
    }
    return (
        <div>
            not logged in
        </div>
    );
}