"use client";

import { useWhoami } from "@/features/auth";
import { RoomStatusEnum, useRooms } from "../..";
import { cl } from "@/shared/lib/cl";
import { GradeRoomAction } from "@/features/room";

export function RoomList(): JSX.Element {
    const { data: rooms } = useRooms();
    const { data } = useWhoami();
    const userId = data?.data.id;

    return (
        <ul className="grid grid-cols-3 gap-2">
            {rooms?.data.map((room) => {
                const isJudge = room.judge.id === userId;
                const isGradingStatus = room.status === RoomStatusEnum.GRADING;
                const isWin = room.winners.some((winner) => winner.id === userId);
                const isLoose = room.winners.length && !isWin;

                return (
                    <li key={room.id} className={cl("border rounded-xl p-2", isWin && "border-green-500", isLoose && "border-red-500", isGradingStatus && "border-gray-500")}>
                        {room.topic}
                        {isJudge && isGradingStatus && <GradeRoomAction roomId={room.id} />}
                    </li>
                );
            })}
        </ul>
    );
}