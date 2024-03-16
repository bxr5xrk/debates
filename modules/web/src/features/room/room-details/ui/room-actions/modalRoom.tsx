import { User } from "@/entities/user";
import { cl } from "@/shared/lib/cl";
import { RoomStatusEnum } from "@/shared/types";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface ModalProps {
    userId: number;
    onJoin: () => void;
    onStart: () => void;
    onlineMembers: User[];
    status: RoomStatusEnum | null;
    isAdmin: boolean;
    modalJoin: () => void;
    setModal: Dispatch<SetStateAction<boolean>> ;
    modal: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    userId,
    onStart,
    onlineMembers,
    status,
    isAdmin,
    modalJoin,
    onJoin,
    setModal,
}) => {
    const [joinRoom, setJoinRoom] = useState(false);

    const join = (): void => {
        !isAdmin && setModal(false);
        onJoin();
        setJoinRoom(!joinRoom);
    };

    const start = (): void => {
        onStart();
        modalJoin();
    };
   
    return (
        <>  {!(status === RoomStatusEnum.STARTED) &&
            <div className={cl(!joinRoom && "bg-white", "absolute w-full h-full top-0 left-0 z-[100] opacity")}>
                <div className="self-center border-4 border-black w-max md:w-1/2 rounded-[50px] mx-auto mt-[200px] p-[20px] md:p-[90px] bg-slate-500">
                    <p className="text-[20px] md:text-[30px] text-center text-white border-text font-bold">{!joinRoom ?"join the room?" : "start game!" }</p>
                    <div className="flex justify-between gap-2 mt-3">
                        <Link
                            className="w-[150px] text-center base-button h-min font-bold"
                            href="./dashboard"
                        >
                                    leave
                        </Link>
                        {!onlineMembers.find((i) => i.id === userId) && (
                            <Button onClick={() => join()} className="w-[130px] h-min">
                                        join
                            </Button>
                        )}
                        {isAdmin && isAdmin && status === RoomStatusEnum.PENDING && (
                            <Button onClick={start} className="w-[130px] h-min">
                                start
                            </Button>)}
                    </div>
                </div>
            </div>
        }
        </>
    );
};

