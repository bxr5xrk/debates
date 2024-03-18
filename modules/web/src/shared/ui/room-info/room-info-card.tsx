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

export function RoomInfoCard({ room, isWin, isLoose, children }: RoomInfoCardProps): JSX.Element {
    return (
        <li
            key={room.id}
            className={cl(
                "flex flex-col justify-between border-2 border-[#020617] rounded-xl p-2.5 shadow-3xl max-[440px]:w-full min-[441px]:w-96 min-[730px]:w-80 lg:w-72 min-[441px]:justify-self-center",
                isWin && "border-green-500",
                isLoose && "border-red-500"
            )}
        >
            <h2 className="text-center font-bold text-2xl pt-2.5">{room.topic}</h2>
            <div>
                <p className="pt-1 text-2xl">Report:</p>
                <div className="flex justify-between text-2xl pt-2.5">
                    <p>Time - {room.reportTime}m</p>
                    <p>Number - {room.reportsNumber}</p>
                </div>
            </div>

            <div className="flex justify-between items-center pt-3.5 w-full">
                {room.owner ? (
                    <div className="flex items-center w-1/2 min-[441px]:w-2/3 min-[730px]:w-3/5" title={`Room owner - ${room.owner.nickname}`}>
                        <ProfileImg src={room.owner.picture} className="w-[35px] h-[35px]" />
                        <p className="ml-1 text-xl overflow-hidden whitespace-nowrap text-ellipsis w-3/4">{room.owner.nickname}</p>
                    </div>
                ) : (
                    <p className="ml-1 text-xl">Likes - {room.likesCount}</p>
                )}
                {children}
            </div>
        </li>
    );
}
