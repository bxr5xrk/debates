"use client";

import { useWhoami } from "@/features/auth";
import { usePublicRooms } from "../..";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { API } from "@/shared/api/api-routes";
import { RoomInfoContainer, RoomInfoCard } from "@/shared/ui";
import { LikeRoomAction, UnlikeRoomAction } from "@/features/room";
import { Pagination } from "@/shared/ui";
import { Spinner } from "@/shared/ui/spinner";

export interface PublicRoomsListProps {
    sortOrder: "ASC" | "DESC";
}

export function PublicRoomsList({ sortOrder }: PublicRoomsListProps): JSX.Element {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data: rooms, isLoading } = usePublicRooms(currentPage, sortOrder);
    const [ like, setLike ] = useState<boolean>(false);
    const { data } = useWhoami();
    const userId = data?.data.id;
    const pagesCount = rooms?.data.pagesCount || 1;

    return (
        <div className="w-full h-full">
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner w={"w-5"} h={"h-5"} />
                </div>
            ) : (
                <div className="flex flex-col w-full h-full">
                    <RoomInfoContainer>
                        {rooms?.data.data.toReversed().map((room) => {
                            return (
                                <RoomInfoCard key={room.id} room={room}>
                                    {!room.isLikedByCurrentUser ? <LikeRoomAction roomId={room.id} likesCount={room.likesCount} like={like} setLike={setLike} /> : <UnlikeRoomAction roomId={room.id} likesCount={room.likesCount} like={like} setLike={setLike} />}
                                </RoomInfoCard>
                            );
                        })}
                    </RoomInfoContainer>
                    {pagesCount > 1 && <Pagination pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} className="self-end mt-auto py-4 max-lg:mb-4" />}
                </div>
            )}
        </div>
    );
}
