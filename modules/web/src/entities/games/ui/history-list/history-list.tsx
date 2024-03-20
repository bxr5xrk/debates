"use client";

import { useWhoami } from "@/features/auth";
import { useRooms } from "../..";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { API } from "@/shared/api/api-routes";
import { RoomInfoCard, RoomInfoContainer } from "@/shared/ui";
import { GradeRoomAction, PublishRoomAction, UnpublishRoomAction } from "@/features/room";
import { Room } from "@/shared/types";

export const getRoomData = (room: Room, userId: number | undefined): boolean[] => {
    const isJudge = room?.judge?.id === userId;
    const isOwner = room?.owner?.id === userId;
    const notGraded = room.notGraded;
    const isWinners = room.winners.length;
    const isUserInConOrPro = notGraded || !isWinners ? false : room.conTeam.some((con) => con.id === userId) || room.proTeam.some((pro) => pro.id === userId);
    const isWin = !isUserInConOrPro ? false : room.winners.some((winner) => winner.id === userId);
    const isLoose = !isUserInConOrPro ? false : !isWin;
    return [isJudge, notGraded, isWin, isLoose, isOwner];
};

export function HistoryList(): JSX.Element {
    const { data: rooms } = useRooms();
    const { data } = useWhoami();
    const userId = data?.data.id;
    const { mutate } = useSWRConfig();

    console.log(rooms);

    useEffect(() => {
        mutate(API.ROOM_ROUTES.onAir);
    }, []);

    return (
        <div className="pb-8">
            <RoomInfoContainer>
                {rooms?.data.toReversed().map((room) => {
                    const [isJudge, notGraded, isWin, isLoose, isOwner] = getRoomData(room, userId);

                    return (
                        <RoomInfoCard key={room.id} room={room} isWin={isWin} isLoose={isLoose} isOwner={isOwner}>
                            {!notGraded ? (
                                isOwner ? (
                                    room.isPublic ? (
                                        <UnpublishRoomAction roomId={room.id} />
                                    ) : (
                                        <PublishRoomAction roomId={room.id} />
                                    )
                                ) : (
                                    ""
                                )
                            ) : isJudge ? (
                                <GradeRoomAction roomId={room.id} room={room} />
                            ) : (
                                "Not graded"
                            )}
                        </RoomInfoCard>
                    );
                })}
            </RoomInfoContainer>
        </div>
    );
}
