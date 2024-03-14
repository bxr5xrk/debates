// import { useFieldsSetup } from "@/features/room/room-details/hooks/use-fields-setup";
import Image from "next/image";
import { cl } from "@/shared/lib/cl";

interface ProfileImgProps {
    className?: string;
    src?: string;
    online?: boolean;
}

export function ProfileImg(props: ProfileImgProps): JSX.Element {
    const { className, src, online } = props;
    return (
        <div className="relative">
            {online && <div className="rounded-full absolute z-[100] bottom-[0px] right-[0px] w-[20px] h-[20px] bg-green"></div>}
            <div
                className={cl("border-2 border-black rounded-full  overflow-hidden md:w-[80px] md:h-[80px]", className,"w-[50px] h-[50px]")}
            >
                <Image
                    width={100}
                    height={100}
                    className="w-full h-full object-cover "
                    src={src || "/anonymous.webp"}
                    alt="profile photo"
                    priority
                />
            </div>
        </div>
    );
}
