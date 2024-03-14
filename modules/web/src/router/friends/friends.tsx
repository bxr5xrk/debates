"use client";

import { FriendsList } from "@/features/friends";
import { InvitesList } from "@/features/friends/invites-list";
import { SentInvitesList } from "@/features/friends/sent-invites-list";
import { Page } from "@/shared/layout/page";

export function FriendsPage(): JSX.Element {
    return (
        <Page protect className="relative">
            <InvitesList />
            <div className="flex flex-col items-center  lg:flex-row gap-4">
                <SentInvitesList />
                <FriendsList />
            </div>
        </Page>
    );
}
