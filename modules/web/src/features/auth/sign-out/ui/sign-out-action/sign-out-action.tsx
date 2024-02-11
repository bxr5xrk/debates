"use client";

import { useAfterFetch } from "@/shared/hooks";
import { useSignOut } from "../../api";
import { API } from "@/shared/api/api-routes";

export function SignOutAction(): JSX.Element {
    const { trigger } = useSignOut();
    const { onAfterFetch } = useAfterFetch({ revalidate: [API.AUTH_ROUTES.whoami] });

    async function onSignOut(): Promise<void> {
        const res = await trigger();

        onAfterFetch(["Signed out successfully", "Failed to sign out"], res.status);
        window.location.reload();
    }

    return (
        <button onClick={onSignOut}>
            Sign out
        </button>
    );
}