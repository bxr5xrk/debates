import { cl } from "@/shared/lib/cl";
import { PropsWithChildren } from "react";
import { Input, Label } from "..";

interface InputWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlFor: string;
  label: string;
  errorMessage?: string;
}

export function InputWithLabel(props: PropsWithChildren<InputWithLabelProps>): JSX.Element {
    const { htmlFor, label, children, className, errorMessage, ...rest } = props;
  
    return (
        <div {...rest}  className={cl("grid w-full max-w-sm items-center gap-1.5", className)}>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            {errorMessage && <span className="text-red-600">{errorMessage} </span>}
        </div>
    );
}

InputWithLabel.Input = Input;