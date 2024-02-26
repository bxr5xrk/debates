"use client";

import { useWhoami } from "@/features/auth";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export function ProtectedRoute(props: PropsWithChildren): JSX.Element {
    const { children } = props;
    const { data, isLoading } = useWhoami();
    const { push } = useRouter();

    if (!isLoading && !data?.data.id) {
        push('/');
    }

    return (
        <>
            {children}
        </>
    );
}