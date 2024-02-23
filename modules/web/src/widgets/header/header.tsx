"use client";

import { SignOutAction, useWhoami } from "@/features/auth";
import { CreateRoomDialog, OnAirAction } from "@/features/room";
import { cl } from "@/shared/lib/cl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    {
        href: '/',
        label: 'Dashboard',
    },
    {
        href: '/friends',
        label: 'Friends',
    }
];

export function Header(): JSX.Element {
    const { data } = useWhoami();
    const pathname = usePathname();
    const isLoggedIn = data?.data?.id;

    // if (!isLoggedIn) {
    //     return <>
    //         <Link scroll={false} href="/sign-in" className={cl(pathname === "/sign-in" && "font-bold")}>
    //             Sign In
    //         </Link>
    //     </>;
    // }

    return (
        <header className="flex border-b w-full">
            <div className="w-full px-2 py-4 max-w-screen-2xl mx-auto">
                <nav className="flex gap-2">
                    {navItems.map((item) => {
                        return (
                            <Link scroll={false} href={item.href} key={item.href} className={cl(pathname === item.href && "font-bold")}>
                                {item.label}
                            </Link>
                        );
                    })}
                    <CreateRoomDialog />
                    <OnAirAction />
                    <SignOutAction />
                </nav>
            </div>
        </header>
    );
}