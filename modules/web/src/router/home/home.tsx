import React from "react";

import { Page } from "@/shared/layout/page";
import { Text, Button } from "@/shared/ui";

//svg
import SwordsSVG from "./SwordsSVG";

export function HomePage(): JSX.Element {
    return (
        <Page className="p-8">
            <Button
                text="Sign Up"
                font="font-bold"
                width="w-20"
                height="h-11"
                fontSize="text-25"
                Tag="Link"
                href="sign-up"
                className={["ml-auto"]}
            />
            <div className="flex justify-center flex-col gap-6 mt-9 h-5/6">
                <SwordsSVG />
                <Text
                    Teg="h1"
                    textInTag="DEBATE NIGHT"
                    className={["text-9xl", "font-bold", "text-center"]}
                />

                <Button
                    text="Play"
                    font="font-bold"
                    width="w-80"
                    height="h-16"
                    fontSize="text-5xl"
                    Tag="Link"
                    href="/sign-in"
                    className={["mx-auto", "mt-11"]}
                />
            </div>
        </Page>
    );
}
