"use client";

import { useWhoami } from "@/features/auth";

export function HomePrivate(): JSX.Element {
    const { data, isLoading } = useWhoami();
    const isLoggedIn = data?.data?.id;

    if (isLoading) {
        return (
            <></>
        );
    }

    if (!isLoggedIn) {
        return (
            <></>
        );
    }

    return (
        <div>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}