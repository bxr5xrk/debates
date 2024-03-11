"use client";

import { PublicRooms } from "./public-rooms/public-rooms";
import { History } from "./history/history";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { ComponentContainer } from "@/shared/ui";
import Image from "next/image";

export type sortOrderType = "ASC" | "DESC";

export function GamesPage(): JSX.Element {
    const [historyOpened, setHistoryOpened] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<sortOrderType>("DESC");

    const toggleSortOrder = (): void => {
        setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    };

    return (
        <ComponentContainer className="flex justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="w-full m-5 grid grid-cols-3 max-[730px]:grid-rows-2 items-center p-2 text-center">
                    {!historyOpened ? <button
                        className="justify-self-start max-[730px]:row-start-2 max-[730px]:col-start-1 max-[730px]:row-end-3 max-[730px]:col-end-2"
                        onClick={() => toggleSortOrder()}
                    >
                        
                        <Image src="/icons/sort-arrows.svg" width={40} height={40} alt="sort"/>
                    </button> : <div></div>}

                    <div className="text-3xl lg:text-4xl font-bold max-[730px]:row-start-1 max-[730px]:col-start-1 max-[730px]:row-end-2 max-[730px]:col-end-4">
                        {historyOpened ? "My History" : "Public Rooms"}
                    </div>

                    <Button
                        className="justify-self-end max-[730px]:row-start-2 max-[730px]:col-start-3 max-[730px]:row-end-3 max-[730px]:col-end-4"
                        onClick={() => setHistoryOpened(!historyOpened)}
                    >
                        {historyOpened ? "Public rooms" : "My history"}
                    </Button>
                </div>
                {historyOpened ? <History /> : <PublicRooms sortOrder={sortOrder} />}
            </div>
        </ComponentContainer>
    );
}