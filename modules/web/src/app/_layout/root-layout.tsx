import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { cl } from "@/shared/lib/cl";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export async function RootLayout(props: PropsWithChildren): Promise<JSX.Element> {
    const { children } = props;

    return (
        <body className={cl(inter.className, "grid grid-rows-[auto_1fr_auto] min-h-screen w-screen bg-slate-50")}>
            <Header />
            {children}
            <Footer />
            <Toaster position="top-center" toastOptions={{
                duration: 3000
            }} />
        </body>
    );
}