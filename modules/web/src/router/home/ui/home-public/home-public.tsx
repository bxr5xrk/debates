"use client";

import { Page } from "@/shared/layout/page";
import { Text } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

export function HomePublic(): JSX.Element {
    return (
        <Page className="p-8">
            <div className="flex justify-center items-center flex-col gap-6 mt-9 h-5/6">
                <Image
                    src="/swords.svg"
                    alt="swords image"
                    className="mx-auto"
                    width={305}
                    height={195}
                />
                <Text
                    Tag="h1"
                    classes={[
                        "sm:text-7xl",
                        "md:text-8xl",
                        "lg:text-9xl",
                        "font-bold",
                        "text-center",
                    ]}
                >
                    DEBATE NIGHT
                </Text>
                <Link href="/sign-in"
                    className="max-w-80 w-fit font-bold text-5xl 
            mx-auto mt-11 p-2 transition duration-1000 after:hover:bg-blackLight
            after:content-[''] after:transition"
                >
                    Play
                </Link>
            </div>
        </Page>
    );
}