import { Room } from "@/shared/types/room";
import { cl } from "@/shared/lib/cl";
import { ProfileImg } from "../profileImg";
import { formatDate } from "@/shared/lib";
import { PropsWithChildren } from "react";

interface RoomInfoCardProps extends PropsWithChildren {
    room: Room;
    isWin?: boolean;
    isLoose?: boolean;
}

export function RoomInfoCard({ room, isWin, isLoose, children}: RoomInfoCardProps): JSX.Element {
    return (
        <li key={room.id} className={cl("border-2 border-[#020617] rounded-xl p-2.5 mb-8 shadow-3xl w-96 min-[730px]:w-80 lg:w-72 m-auto", isWin && "border-green-500", isLoose && "border-red-500")}>
            <h2 className="text-center font-bold text-2xl pt-2.5">{room.topic}</h2>
            <p className="pt-1 text-2xl">Report:</p>
            <div className="flex justify-between text-2xl pt-2.5">
                <p>Time - {room.reportTime}m</p>
                <p>Number - {room.reportsNumber}</p>
            </div>

            <div className="flex justify-between items-center pt-3.5">
                {room.owner ? (
                    <div className="flex items-center">
                        <ProfileImg src={room.owner.picture} className="w-11 h-11" />
                        <p className="ml-1 text-xl">{room.owner.nickname}</p>
                    </div>
                ) : (
                    <p className="ml-1 text-xl">Likes - {room.likesCount}</p>
                )}
                {children}
            </div>
        </li>
    );
}
