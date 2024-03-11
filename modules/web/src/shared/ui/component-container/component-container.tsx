import { PropsWithChildren } from "react";
import { cl } from "@/shared/lib/cl";

export interface ComponentContainerProps extends PropsWithChildren {
    className?: string;
}

export function ComponentContainer(props: ComponentContainerProps): JSX.Element {
    const { className, children } = props;
    return <div className={cl("border-2 border-slate-700 shadow-3xl rounded-md m-4 p-4 py-7 lg:py-10 w-auto", className)}>{children}</div>;
}
