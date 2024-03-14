// import { useFieldsSetup } from "@/features/room/room-details/hooks/use-fields-setup";
import Image from "next/image";
import { cl } from "@/shared/lib/cl";

interface ProfileImgProps {
    className?: string;
    src?: string;
}

export function ProfileImg(props: ProfileImgProps): JSX.Element {
    const { className, src } = props;
    return (
        <div
            className={cl("border-2 border-black rounded-full  md:w-[80px] md:h-[80px] overflow-hidden", className,"w-[50px] h-[50px]")}
        >
            <Image
                width={100}
                height={100}
                className="w-full h-full object-cover"
                src={src || "/anonymous.webp"}
                alt="profile photo"
                priority
            />
        </div>
    );
}
