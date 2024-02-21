import { RegistrationData } from "@/features/auth";
import { LoginData } from "@/features/auth";

type RegOrLogData = LoginData | RegistrationData;

interface InputProps<
    T extends RegistrationData,
    U extends keyof RegistrationData
> {
    name: U;
    // setValue: React.Dispatch<React.SetStateAction<RegistrationData>> | React.Dispatch<React.SetStateAction<LoginData>>;
    className?: string;
    type: string;
    required: boolean;
    id: string;
    placeholder: string;
    value: T;
    setValue: React.Dispatch<React.SetStateAction<RegistrationData>>;
}

export function Input<
    T extends RegistrationData,
    U extends keyof RegistrationData
>({
    name,
    className = '',
    type,
    required,
    id,
    placeholder,
    value,
    setValue,
}: InputProps<T, U> ): JSX.Element {
    return (
        <input
            className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96 ${className}`}
            type={type}
            name={name}
            required={required}
            minLength={2}
            id={id}
            placeholder={placeholder}
            value={value[name]}
            onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
            }
        />
    );
}
