import type { Metadata } from "next";
import "./_styles/index.css";
import { RootLayout } from "./_layout/root-layout";

export const metadata: Metadata = {
    title: "Debates"
};

export default function Layout({
    children,
    auth,
}: Readonly<{
    children: React.ReactNode;
    auth: React.ReactNode;
}>): JSX.Element {
    return (
        <html suppressHydrationWarning={true} lang="en">
            <RootLayout>
                {auth}
                {children}
            </RootLayout>
        </html>
    );
}
