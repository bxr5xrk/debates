"use client";
import React from "react";
import { Page } from "@/shared/layout/page";

import { HomePrivate } from "./ui/home-private/home-private";
import { HomePublic } from "./ui/home-public/home-public";

import { Text } from "@/shared/ui";
import { Button } from "@/shared/ui";

import Image from "next/image";

import { useRouter } from "next/navigation";

export function HomePage(): JSX.Element {
    const router = useRouter();

    const handleButtonClick = (navigate: string): void => {
        router.push(`/${navigate}`);
    };

    return (
        <Page className="p-8">
            <HomePrivate />
            <HomePublic />
            <div className="flex">
                <Button
                    onClick={() => handleButtonClick("sign-up")}
                    className="ml-auto font-bold w-21 text-25 transition duration-1000
                    after:content-[''] after:hover:bg-blackLight hover:text-white"
                >
                    Sign Up
                </Button>
            </div>
            <div className="flex justify-center flex-col gap-6 mt-9 h-5/6">
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
                <Button
                    onClick={() => handleButtonClick("#")}
                    className="max-w-80 w-full font-bold text-5xl 
                mx-auto mt-11 p-2 transition duration-1000 after:hover:bg-blackLight
                after:content-['']  hover:text-white after:transition"
                >
                    Play
                </Button>
            </div>
        </Page>
    );
}
