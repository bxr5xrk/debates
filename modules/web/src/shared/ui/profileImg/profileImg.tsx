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
            className={cl("border-2 border-black rounded-full w-[80px] h-[80px] overflow-hidden", className)}
        >
            <Image
                width={800}
                height={800}
                className="w-full h-full object-cover"
                src={src || "/anonymous.webp"}
                alt="profile photo"
                priority
            />
        </div>
    );
}
