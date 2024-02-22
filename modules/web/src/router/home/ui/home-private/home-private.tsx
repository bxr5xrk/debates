"use client";

import { useWhoami } from "@/features/auth";
import { FriendsList } from "@/features/friends";
import { InvitesList } from "@/features/friends/invites-list";

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
            <FriendsList />
            <InvitesList />
        </div>
    );
}