"use client";

import { useWhoami } from "@/features/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export function ProtectedRoute(props: PropsWithChildren): JSX.Element {
    const { children } = props;
    const { data, isLoading } = useWhoami();

    if (!isLoading && !data?.data.id) {
        redirect('/');
    }

    return (
        <>
            {children}
        </>
    );
}