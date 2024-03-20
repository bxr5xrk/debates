import { SignOutAction } from "@/features/auth";
import { CreateRoomDialog, OnAirAction } from "@/features/room";
import { cl } from "@/shared/lib/cl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { API } from "@/shared/api/api-routes";
import { useMe } from "@/entities/user";
import { ProfileImg } from "@/shared/ui/profileImg";

const navItems = [
    {
        href: "/friends",
        label: "Friends",
    },
    {
        href: "/games",
        label: "Games",
    },
];

export function HeaderPrivate(): JSX.Element {
    const pathname = usePathname();
    const { mutate } = useSWRConfig();
    const { data } = useMe();

    useEffect(() => {
        mutate(API.ROOM_ROUTES.onAir);
    }, []);

    return (
        <header className="flex border-b w-full h-14 items-center lg:justify-center">
            <div className="w-full px-2 py-4 max-w-screen-2xl ">
                <nav className="flex gap-2 lg:justify-end items-center">
                    <Link scroll={false} href="/" key="/" className={cl(pathname === "/" && "font-bold", "flex items-center gap-3")}>
                        {data?.data.picture && <ProfileImg className="w-[35px] h-[35px]" src={data.data.picture} />}
                        Edit profile
                    </Link>
                    {navItems.map((item) => (
                        <Link scroll={false} href={item.href} key={item.href} className={cl(pathname === item.href && "font-bold")}>
                            {item.label}
                        </Link>
                    ))}
                    <CreateRoomDialog />
                    <OnAirAction />
                    <SignOutAction />
                </nav>
            </div>
        </header>
    );
}
