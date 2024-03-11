import { useFieldsSetup } from "@/features/room/room-details/hooks/use-fields-setup";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileImg {
src: string | undefined;
}


export default function ProfileImg({src}: ProfileImg): JSX.Element {
    const [isOnline, setIsOnline] = useState(false);
    const { onlineMembers } = useFieldsSetup();

    useEffect(() => {
        onlineMembers.map((member) => {
            member.picture === src?
                setIsOnline(true):setIsOnline(false);
        });
    }, [onlineMembers, src]);    
    
    
    return (
        <div className="relative">
            {isOnline && (<div className="absolute h-[20px] w-[20px] bg-green rounded-full bottom-[2px] right-[-2px] z-10"></div>)}
            <div
                className={`border-2 border-black rounded-full w-[65px] h-[65px] relative overflow-hidden`}
            >
                <Image
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    src={src ? src : "/anonymous.webp"}
                    alt="profile-photo"
                />
            </div>
        </div>
    );
}
