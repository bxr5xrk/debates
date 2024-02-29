import { cl } from "@/shared/lib/cl";
import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, forwardRef } from "react";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
    return (
        <input
            autoComplete={props.autoComplete ?? props.id ?? "off"}
            className={cl(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                props.className
            )}
            {...props}
            ref={ref}
        />
    );
});

Input.displayName = "Input";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    label?: string;
    errorMessage?: string;
    containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export function InputGroup(props: InputGroupProps): JSX.Element {
    const { label, children, id, errorMessage, containerProps, ...meta } = props;

    return (
        <div {...meta}>
            {label && <label htmlFor={id}>{label}</label>}
            <div {...containerProps} className={cl("border rounded-lg border-slate-700 p-2", containerProps?.className)}>
                {children}
            </div>
            {errorMessage && <span className="text-red-600">{errorMessage} </span>}
        </div>
    );
}

InputGroup.Input = Input;
