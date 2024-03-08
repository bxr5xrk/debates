"use client";

import { useWhoami } from "@/features/auth";
import { usePublicRooms } from "../..";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { API } from "@/shared/api/api-routes";
import { RoomInfoContainer, RoomInfoCard } from "@/shared/ui";
import { LikeRoomAction, UnlikeRoomAction } from "@/features/room";
import { Pagination } from "@/shared/ui";

export interface PublicRoomsListProps {
    sortOrder: "ASC" | "DESC";
}

export function PublicRoomsList({ sortOrder }: PublicRoomsListProps): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: rooms } = usePublicRooms(currentPage, sortOrder);
    const { data } = useWhoami();
    const userId = data?.data.id;
    const { mutate } = useSWRConfig();
    const pagesCount = rooms?.data.pagesCount || 1;
    console.log("rendered");
    console.log(rooms);

    useEffect(() => {
        mutate(API.ROOM_ROUTES.onAir);
    }, []);

    return (
        <div>
            <RoomInfoContainer>
                {rooms?.data.data.toReversed().map((room) => {
                    return (
                        <RoomInfoCard key={room.id} room={room}>
                            {!room.isLikedByCurrentUser ? <LikeRoomAction roomId={room.id} /> : <UnlikeRoomAction roomId={room.id} />}
                        </RoomInfoCard>
                    );
                })}
            </RoomInfoContainer>
            <Pagination pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
