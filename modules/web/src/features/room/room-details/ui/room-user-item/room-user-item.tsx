import { cl } from "@/shared/lib/cl";
import { ProfileImg } from "@/shared/ui/profileImg";
import { onlineMembersArr } from "../..";

interface RoomUserItemProps {
    nickname: string;
    email: string;
    isCurrentUser?: boolean;
    picture?: string;
    id: number; 
}

export function RoomUserItem(props: RoomUserItemProps): JSX.Element {
    const { nickname, picture, isCurrentUser, id} = props;

    return (
        <div
            className={cl(
                isCurrentUser && "bg-green-100", "flex items-center gap-2 sm:gap-3 w-max"
            )}
        >
            <ProfileImg src={picture} online={onlineMembersArr.includes(id)} className="lg:w-[80px] lg:h-[80px] md:w-[70px] md:h-[70px] w-[60px] h-[60px]"/>
            <p className=" flex items-center text-[10px] sm:text-[15px] md:text-[18px] lg:text-2xl ">{nickname}</p>
        </div>
    );
}
