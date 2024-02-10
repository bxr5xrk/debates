"use client";
import { SessionProvider as NextSessionProvider, SessionProviderProps } from "next-auth/react";
import { PropsWithChildren } from "react";

export function SessionProvider(props: PropsWithChildren<SessionProviderProps>): JSX.Element {
    const { children, ...meta } = props;

    return (
        <NextSessionProvider {...meta}>
            {children}
        </NextSessionProvider>
    );
}