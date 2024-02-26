"use client";

import { useWhoami } from "@/features/auth";

export function useLoggedIn(): {
    isLoading: boolean;
    isLoggedIn: boolean;
    } {
    const { data, isLoading } = useWhoami();
    const isLoggedIn = Boolean(data?.data?.id && !isLoading);

    return {
        isLoading,
        isLoggedIn
    };
}