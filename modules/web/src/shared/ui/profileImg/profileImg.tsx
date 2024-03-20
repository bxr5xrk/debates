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
            {online && <div className="border-black border-2 rounded-full absolute z-[99] bottom-[0px] right-[0px] w-[15px] h-[15px] md:w-[20px] md:h-[20px] bg-green"></div>}
            <div
                className={cl(className,"border-2 border-black rounded-full  overflow-hidden ")}
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
