"use client";

import { useWhoami } from "@/features/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export function ProtectedRoute(props: PropsWithChildren): JSX.Element {
    const { children } = props;
    const { data } = useWhoami();

    if (!data?.data.id) {
        redirect('/');
    }

    return (
        <>
            {children}
        </>
    );
}