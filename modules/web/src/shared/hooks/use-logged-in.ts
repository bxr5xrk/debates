"use client";

import { useWhoami } from "@/features/auth";

export function useLoggedIn(): boolean {
    const { data, isLoading } = useWhoami();
    const isLoggedIn = Boolean(data?.data?.id && !isLoading);

    return isLoggedIn;
}