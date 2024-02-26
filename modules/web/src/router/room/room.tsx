"use client";

import { useRoomValid } from "@/entities/room";
import { useWhoami } from "@/features/auth";
import { RoomDetails } from "@/features/room";
import { Page } from "@/shared/layout/page";
import { useRouter } from "next/navigation";

interface RoomPageProps {
    roomId: string;
}

export function RoomPage(props: RoomPageProps): JSX.Element {
    const { roomId } = props;
    const { data: whoami, isLoading: isWhoamiLoading } = useWhoami();
    const { data, isLoading } = useRoomValid(roomId);
    const userId = whoami?.data.id;
    const { push } = useRouter();

    // If the user is not logged in, redirect to the home page
    if (!userId && !isWhoamiLoading) {
        push("/");
    }

    if (!userId) {
        return <></>;
    }

    // If the room is not valid, redirect to the history page
    if (!data?.data && !isLoading) {
        push("/history");
    }

    return (
        <Page>
            <RoomDetails roomId={roomId} userId={userId} />
        </Page>
    );
}
