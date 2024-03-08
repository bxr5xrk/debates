"use client";

import { useWhoami } from "@/features/auth";
import { useRooms, usePublicRooms } from "../..";
import { cl } from "@/shared/lib/cl";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { API } from "@/shared/api/api-routes";
import { RoomInfoCard, RoomInfoContainer } from "@/shared/ui";
import { GradeRoomAction, PublishRoomAction, UnpublishRoomAction } from "@/features/room";

export function HistoryList(): JSX.Element {
    const { data: rooms } = useRooms();
    const { data: publicRooms } = usePublicRooms();
    console.log("History:");
    console.log(rooms);
    console.log("Public rooms:");
    console.log(publicRooms);
    const { data } = useWhoami();
    const userId = data?.data.id;
    const { mutate } = useSWRConfig();

    useEffect(() => {
        mutate(API.ROOM_ROUTES.onAir);
    }, []);

    return (
        <RoomInfoContainer>
            {rooms?.data.toReversed().map((room) => {
                const isJudge = room?.judge?.id === userId;
                const notGraded = room.notGraded;
                const isWinners = room.winners.length;
                const isUserInConOrPro =
                    notGraded || !isWinners ? false : room.conTeam.some((con) => con.id === userId) || room.proTeam.some((pro) => pro.id === userId);
                const isWin = !isUserInConOrPro ? false : room.winners.some((winner) => winner.id === userId);
                const isLoose = !isUserInConOrPro ? false : !isWin;

                return (
                    <RoomInfoCard key={room.id} room={room} isWin={isWin} isLoose={isLoose}>
                        {!notGraded ? (
                            room.isPublic ? (
                                <UnpublishRoomAction roomId={room.id} />
                            ) : (
                                <PublishRoomAction roomId={room.id} />
                            )
                        ) : isJudge ? (
                            <GradeRoomAction roomId={room.id} />
                        ) : (
                            "Not graded"
                        )}
                    </RoomInfoCard>
                );
            })}
        </RoomInfoContainer>
    );
}
