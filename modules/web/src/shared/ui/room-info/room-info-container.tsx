import { PropsWithChildren } from "react";

export function RoomInfoContainer(props: PropsWithChildren): JSX.Element {
    const { children } = props;
    return <ul className="w-full justify-center grid grid-cols-1 gap-6 min-[730px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</ul>;
}
