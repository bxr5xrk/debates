"use client";

import { useOnAir } from "../../api";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function OnAirAction(): JSX.Element {
    const { data } = useOnAir();
    const pathname = usePathname();
    const room = data?.data;

    if (!room || isRoomPath(pathname)) {
        return <></>;
    }

    return (
        <Link href={`/rooms/${room.id}`} className="flex gap-2 items-center">
            <Image src="/icons/radio.svg" alt="On Air" width={16} height={16} />
            On Air
        </Link>
    );
}

function isRoomPath(pathname: string): boolean {
    return pathname.includes("/rooms/");
}