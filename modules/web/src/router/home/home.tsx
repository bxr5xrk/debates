import { Page } from "@/shared/layout/page";
import { HomePrivate } from "./ui/home-private/home-private";
import { HomePublic } from "./ui/home-public/home-public";

export function HomePage(): JSX.Element {
    return (
        <Page>
            <HomePrivate />
            <HomePublic />
        </Page>
    );
}