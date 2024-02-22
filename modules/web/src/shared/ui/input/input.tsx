import { cl } from "@/shared/lib/cl";
import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, forwardRef } from "react";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({ ...props }, ref) {
        return (
            <input
                ref={ref}
                {...props}
                autoComplete={props.autoComplete ?? props.id ?? "off"}
                className={cl("w-full outline-none focus:outline-none", props.className)}
            />
        );
    },
);

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    label?: string;
    errorMessage?: string;
    containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export function InputGroup(props: InputGroupProps): JSX.Element {
    const { label, children, id, errorMessage, containerProps, ...meta } = props;

    return (
        <div {...meta} >
            {label && <label htmlFor={id}>{label}</label>}
            <div {...containerProps} className={cl("border rounded-lg border-slate-700 p-2", containerProps?.className)}>
                {children}
            </div>
            {errorMessage && <span className="text-red-600">{errorMessage} </span>}
        </div>
    );
}

InputGroup.Input = Input;