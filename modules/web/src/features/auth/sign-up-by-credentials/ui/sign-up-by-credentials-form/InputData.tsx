// export interface LoginData {
//     name: string;
//     password: string;
// }

import { RegistrationData } from "./sign-up-by-credentials-form";

// type RegOrLogData = LoginData | RegistrationData;

export default function InputData<T extends RegistrationData, U extends keyof RegistrationData>({
    className = "",
    type,
    name,
    required,
    id,
    placeholder,
    value,
    setValue,
}: {
    className?: string;
    type: string;
    name: U;
    required: boolean;
    id: string;
    placeholder: string;
    value: T;
    // setValue: React.Dispatch<React.SetStateAction<RegistrationData>> | React.Dispatch<React.SetStateAction<LoginData>>;
    setValue: React.Dispatch<React.SetStateAction<RegistrationData>>;
}): JSX.Element {
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
