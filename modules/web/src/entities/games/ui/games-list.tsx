"use client";

import { useWhoami } from "@/features/auth";
import { useRooms, usePublicRooms } from "..";
import { cl } from "@/shared/lib/cl";
import { GradeRoomAction } from "@/features/room";
import { formatTime } from "@/shared/lib";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { API } from "@/shared/api/api-routes";
import { PublishRoomAction } from "./publish-room";
import { ProfileImg } from "@/shared/ui/profileImg";

export function RoomList({ children }: any): JSX.Element {
    // const { data: rooms } = useRooms();
    const { data: rooms } = usePublicRooms();
    console.log(rooms);
    console.log("data");
    // console.log(publicRooms);
    const { data } = useWhoami();
    const userId = data?.data.id;
    const { mutate } = useSWRConfig();

    useEffect(() => {
        mutate(API.ROOM_ROUTES.onAir);
    }, []);

    return (
        <ul className="w-full flex flex-col items-center sm:flex-row sm:justify-evenly sm:flex-wrap sm:gap-2">
            {rooms?.data.toReversed().map((room) => {
                const isJudge = room.judge.id === userId;
                const notGraded = room.notGraded;
                const isWinners = room.winners.length;
                const isUserInConOrPro =
                    notGraded || !isWinners ? false : room.conTeam.some((con) => con.id === userId) || room.proTeam.some((pro) => pro.id === userId);
                const isWin = !isUserInConOrPro ? false : room.winners.some((winner) => winner.id === userId);
                const isLoose = !isUserInConOrPro ? false : !isWin;

                return (
                    <li
                        key={room.id}
                        className={cl("border-2 border-[#020617] rounded-xl p-2.5 mb-8 shadow-3xl w-72", isWin && "border-green-500", isLoose && "border-red-500", notGraded && "border-gray-500")}
                    >
                        <h2 className="text-center font-bold text-2xl pt-2.5">{room.topic}</h2>
                        <p className="pt-1 text-2xl">Report:</p>
                        <div className="flex justify-between text-2xl pt-2.5">
                            <p>Time - {room.reportTime}m</p>
                            <p>Number - {room.reportsNumber}</p>
                        </div>

                        <div className="flex justify-between items-center pt-3.5">
                            <div className="flex items-center">
                                <ProfileImg src={room.owner.picture} className="w-11 h-11" />
                                <p className="ml-1 text-xl">{room.owner.nickname}</p>
                            </div>
                            {/* {!notGraded ? children : isJudge ? <GradeRoomAction roomId={room.id} /> : "Not graded"} */}
                            {!notGraded ? (<PublishRoomAction roomId={room.id} />) : isJudge ? <GradeRoomAction roomId={room.id} /> : "Not graded"}
                        </div>

                        {/* {isJudge && notGraded && <GradeRoomAction roomId={room.id} />} */}
                        {/* <button>Publish</button> */}
                        {/* <PublishRoomAction roomId={room.id} />
                        <br />
                        <button>Like</button> */}
                    </li>
                );
            })}
        </ul>
    );
}
