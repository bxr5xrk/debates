import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { SessionProvider } from "../_providers/session-provider";
const inter = Inter({ subsets: ["latin"] });

export async function Layout(props: PropsWithChildren): Promise<JSX.Element> {
    const { children } = props;
    const session = await getServerSession();

    return (
        <body className={inter.className}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </body>
    );
}