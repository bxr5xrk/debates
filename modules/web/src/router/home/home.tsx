import React from "react";
import { Page } from "@/shared/layout/page";
import { HomePrivate } from "./ui/home-private/home-private";
import { HomePublic } from "./ui/home-public/home-public";
import { Text } from "@/shared/ui";
import Button from "@/shared/ui/Button";
import Image from "next/image";

export function HomePage(): JSX.Element {
    return (
        <Page className="p-8">
            <HomePrivate />
            <HomePublic />
            <Button
                font="font-bold"
                width="w-21"
                fontSize="text-25"
                Tag="button"
                href="sign-up"
                className={["ml-auto", "font-bold", "w-21", "text-25",]}
            >
                Sign Up
            </Button>
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
                    classes={["text-9xl", "font-bold", "text-center"]}
                >
                    DEBATE NIGHT
                </Text>

                <Button
                    font="font-bold"
                    width="w-80"
                    height="h-16"
                    fontSize="text-5xl"
                    Tag="button"
                    href="/sign-in"
                    className={["mx-auto mt-11"]}
                >
                    Play
                </Button>
            </div>
        </Page>
    );
}
