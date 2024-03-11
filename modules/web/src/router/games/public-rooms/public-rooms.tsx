import { Page } from "@/shared/layout/page";
import { PublicRoomsList, PublicRoomsListProps } from "@/entities/games/";

export function PublicRooms({ sortOrder }: PublicRoomsListProps): JSX.Element {
    return (
        <Page protect>
            <PublicRoomsList sortOrder={sortOrder} />
        </Page>
    );
}
