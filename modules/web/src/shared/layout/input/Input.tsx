import { RegistrationData } from "@/features/auth";
import { LoginData } from "@/features/auth";

interface InputProps<
    T extends LoginData | RegistrationData,
    U extends keyof LoginData | keyof RegistrationData
> {
    name: U;
    setData: React.Dispatch<React.SetStateAction<RegistrationData>> | React.Dispatch<React.SetStateAction<LoginData>>;
    className?: string;
    type: string;
    id: string;
    placeholder: string;
    data: T;
    // setValue: React.Dispatch<React.SetStateAction<RegistrationData>>;
}

export function Input<
    T extends LoginData | RegistrationData,
    U extends keyof LoginData | keyof RegistrationData
>({
    name,
    className = '',
    type,
    id,
    placeholder,
    data,
    setData,
}: InputProps<T, U> ): JSX.Element {
    return (
        <input
            className={`shadow-md border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4 lg:p-2 lg:w-96 ${className}`}
            type={type}
            name={name}
            minLength={2}
            id={id}
            placeholder={placeholder}
            value={data[name]}
            onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
            }
        />
    );
}
