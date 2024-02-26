import { PropsWithChildren } from "react";
import { Arvo } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { cl } from "@/shared/lib/cl";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

const arvo = Arvo({ subsets: ["latin"], weight: ["400", "700"] });

export async function RootLayout(
    props: PropsWithChildren
): Promise<JSX.Element> {
    const { children } = props;

    return (

        <body className={cl(arvo.className, "grid grid-rows-[auto_1fr_auto] min-h-screen w-screen bg-slate-50")}>
            <Header />
            {children}
            <Footer hide />
            <Toaster position="top-center" toastOptions={{
                duration: 3000
            }} />
            <NextTopLoader color="#1F3A8A" showSpinner={false} shadow="none" />
        </body>
    );
}
