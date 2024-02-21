import { LoginData } from "@/features/auth";

interface LoginInputProps<
    T extends LoginData,
    U extends keyof LoginData
> {
    name: U;
    className?: string;
    type: string;
    required: boolean;
    id: string;
    placeholder: string;
    value: T;
    setValue: React.Dispatch<React.SetStateAction<LoginData>>;
}

export function LoginInput<
    T extends LoginData,
    U extends keyof LoginData
>({
    name,
    className = '',
    type,
    required,
    id,
    placeholder,
    value,
    setValue,
}: LoginInputProps<T, U> ): JSX.Element {
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
