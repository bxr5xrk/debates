import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const inter = Inter({ subsets: ["latin"] });

export async function Layout(props: PropsWithChildren): Promise<JSX.Element> {
    const { children } = props;

    return (
        <body className={inter.className}>
            <Header />
            {children}
            <Footer />
        </body>
    );
}