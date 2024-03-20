import { Room } from "@/shared/types";
import { RoomUserItem } from "../room-user-item";
import { cl } from "@/shared/lib/cl";
import { useWhoami } from "@/features/auth";

interface Judge {
room: Room;
className?: string;
}

export default function Judge(props: Judge): JSX.Element {
    const {room, className} = props;
    const { data: whoami, } = useWhoami();
    const userId = whoami?.data.id;
    return (
        <div className={cl("flex flex-col mt-auto mb-[90px] items-center",className)}>
            <p className="text-[20px] lg:text-[30px] w-[145px] bg-amber-400 rounded-[10px] text-center border border-black border-r-4">
            judge
            </p>
            <div className="bg-amber-400 p-2 w-max font-bold text-[12px] rounded-[20px] border border-black border-r-4 border-b-4">
                <RoomUserItem
                    {...room?.judge}
                    isCurrentUser={room?.judge.id === userId}
                />
            </div>
        </div>
    );
}
