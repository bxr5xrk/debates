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
                isCurrentUser && "bg-green-100", "flex items-center gap-3 w-max"
            )}
        >
            <ProfileImg src={picture} online={onlineMembersArr.includes(id)}/>
            <p className="flex items-center text-2xl">{nickname}</p>
        </div>
    );
}
