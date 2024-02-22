import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { cl } from "@/shared/lib/cl";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export async function RootLayout(props: PropsWithChildren): Promise<JSX.Element> {
    const { children } = props;

    return (
        <body className={cl(inter.className, "grid grid-rows-[auto_1fr_auto] min-h-screen w-screen")}>
            <Header />
            {children}
            <Footer />
            <Toaster richColors closeButton duration={3000} position="top-center" />
        </body>
    );
}