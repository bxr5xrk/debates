import Image from "next/image";

interface ProfileImgProps {
    src?: string;
}

export function ProfileImg(props: ProfileImgProps): JSX.Element {
    const { src } = props;
    return (
        <div
            className={`border-2 border-black rounded-full w-[80px] h-[80px] overflow-hidden`}
        >
            <Image
                width={80}
                height={80}
                className="w-full h-full object-cover"
                src={src || "/anonymous.webp"}
                alt="profile photo"
            />
        </div>
    );
}
