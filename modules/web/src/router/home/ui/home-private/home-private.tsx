"use client";

import { Page } from "@/shared/layout/page";
import { HomeButton } from "./homeButton/homeButton";

export function HomePrivate(): JSX.Element {
    return (
        <Page className="p-4 flex flex-col gap-[10px]">
            <div className="flex justify-between gap-[10px]">
                <HomeButton title="Member since" value="Feb 06, 2024"/>
                <HomeButton title="Time in game" value="52h 32m 12s"/>
                <HomeButton title="Games played" value="43"/>
                <HomeButton title="Victories" value="31 is 72%"/>
            </div>
            <div></div>
        </Page>
    );
}