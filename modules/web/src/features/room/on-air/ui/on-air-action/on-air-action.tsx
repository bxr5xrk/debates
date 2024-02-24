"use client";

import { useOnAir } from "../../api";
import Image from "next/image";
import Link from "next/link";

export function OnAirAction(): JSX.Element {
    const { data } = useOnAir();
    const room = data?.data;

    if (!room) {
        return <></>;
    }

    return (
        <Link href={`/room/${room.id}`}>
            <Image src="/icons/radio.svg" alt="On Air" width={16} height={16} />
      Join
        </Link>
    );
}