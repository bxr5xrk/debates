import type { Metadata } from "next";
import "./_styles/index.css";
import { RootLayout } from "./_layout/root-layout";

export const metadata: Metadata = {
    title: "Debates"
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <html suppressHydrationWarning={true} lang="en">
            <RootLayout>
                {children}
            </RootLayout>
        </html>
    );
}
