import Image from "next/image";

export default function ProfileImg({
    src,
}: {
    src: string | undefined;
}): JSX.Element {
    return (
        <div
            className={`border-2 border-black rounded-full w-[80px] h-[80px] overflow-hidden`}
        >
            <Image
                width={80}
                height={80}
                className="w-full h-full object-cover"
                src={src ? src : "/anonymous.webp"}
                alt="profile-photo"
            />
        </div>
    );
}
