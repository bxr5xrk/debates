import { Page } from "@/shared/layout/page";
import { HistoryList } from "@/entities/games/";

export function History(): JSX.Element {
    return (
        <Page protect>
            <HistoryList />
        </Page>
    );
}
