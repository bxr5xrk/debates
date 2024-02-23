import { PropsWithChildren } from "react";
import { Arvo } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { cl } from "@/shared/lib/cl";

const arvo = Arvo({ subsets: ["latin"], weight: ["400", "700"] });

export async function RootLayout(
    props: PropsWithChildren
): Promise<JSX.Element> {
    const { children } = props;

    return (
        <body className={cl(arvo.className, "flex", "flex-col")}>
            <Header />
            {children}
            <Footer />
        </body>
    );
}
