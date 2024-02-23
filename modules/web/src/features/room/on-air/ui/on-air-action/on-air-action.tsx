"use client";

import { Button } from "@/shared/ui";
import { useOnAir } from "../../api";
import Image from "next/image";

export function OnAirAction(): JSX.Element {
    const { data } = useOnAir();
    const room = data?.data;

    if (!room) {
        return <></>;
    }

    return (
        <Button>
            <Image src="/icons/radio.svg" alt="On Air" width={16} height={16} />
      Join
        </Button>
    );
}