"use client";

import { useWhoami } from "@/features/auth";
import { useRooms } from "../..";
import { cl } from "@/shared/lib/cl";
import { GradeRoomAction } from "@/features/room";
import { formatTime } from "@/shared/lib";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { API } from "@/shared/api/api-routes";

export function RoomList(): JSX.Element {
    const { data: rooms } = useRooms();
    const { data } = useWhoami();
    const userId = data?.data.id;
    const {mutate} = useSWRConfig();

    useEffect(() => {
        mutate(API.ROOM_ROUTES.onAir);
    }, []);

    return (
        <ul className="grid grid-cols-3 gap-2">
            {rooms?.data.toReversed().map((room) => {
                const isJudge = room.judge.id === userId;
                const notGraded = room.notGraded;
                const isWinners = room.winners.length;
                const isUserInConOrPro = (notGraded || !isWinners) ? false : room.conTeam.some((con) => con.id === userId) || room.proTeam.some((pro) => pro.id === userId);
                const isWin = !isUserInConOrPro ? false : room.winners.some((winner) => winner.id === userId);
                const isLoose = !isUserInConOrPro ? false : !isWin;

                return (
                    <li key={room.id} className={cl("border rounded-xl p-2", isWin && "border-green-500", isLoose && "border-red-500", notGraded && "border-gray-500")}>
                        <p>topic: {room.topic}</p>
                        <p>reportTime: {formatTime(room.reportTime)}</p>
                        <p>reportsNumber: {room.reportsNumber}</p>
                        {isJudge && notGraded && <GradeRoomAction roomId={room.id} />}
                    </li>
                );
            })}
        </ul>
    );
}