import { cl } from "@/shared/lib/cl";
import { PropsWithChildren } from "react";
import { Spinner } from "../spinner";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isLoading?: boolean;
}

export function Button(props: PropsWithChildren<ButtonProps>): JSX.Element {
    const { children, className, isLoading, disabled, ...rest } = props;
    // const isDisabled = disabled || isLoading;

    return (
        <button disabled={disabled} {...rest} className={cl("base-button capitalize font-semibold ", className)}>
            {isLoading ? <Spinner /> : children}
        </button>
    );
}