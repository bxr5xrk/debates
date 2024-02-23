import React from "react";

import { Page } from "@/shared/layout/page";
import { Text, Button } from "@/shared/ui";

//svg
import Image from "next/image";

export function HomePage(): JSX.Element {
    return (
        <Page className="p-8">
            <Button
                text="Sign Up"
                font="font-bold"
                width="w-21"
                fontSize="text-25"
                Tag="button"
                href="sign-up"
                className={["ml-auto"]}
            />
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
                    text="Play"
                    font="font-bold"
                    width="w-80"
                    height="h-16"
                    fontSize="text-5xl"
                    Tag="button"
                    href="/sign-in"
                    className={["mx-auto", "mt-11"]}
                />
            </div>
        </Page>
    );
}
