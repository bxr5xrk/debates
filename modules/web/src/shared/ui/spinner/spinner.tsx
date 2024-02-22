import { cl } from "@/shared/lib/cl";

interface SpinnerProps {
  w?: string;
  h?: string;
}

export function Spinner(props: SpinnerProps): JSX.Element {
    const { w = "h-4", h = "w-4" } = props;

    return (
        <div className={cl(`${w} ${h}`, "inline-block animate-spin rounded-full border-2 border-black border-r-slate-300 border-t-slate-300")} />
    );
}