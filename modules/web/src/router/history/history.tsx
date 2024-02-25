import { RoomList } from "@/entities/room";
import { Page } from "@/shared/layout/page";

export function HistoryPage(): JSX.Element {
    return (
        <Page>
            <RoomList />
        </Page>
    );
}