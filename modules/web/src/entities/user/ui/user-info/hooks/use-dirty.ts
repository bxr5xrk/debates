import { useEffect, useState } from "react";
import { Control, DefaultValues, UseFormWatch } from "react-hook-form";

export function useDirty<T extends object>(control: Control<T>, watch: UseFormWatch<T>, isLoading: boolean, file: File | null): [boolean, (value: boolean) => void] {
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (file) {
            setIsDirty(true);
            return;
        }

        let localIsDirty = false;

        Object.keys(control._defaultValues).forEach((key) => {
            const defaultValue = control._defaultValues[key as keyof DefaultValues<T>] ?? "";
            const formValue = control._formValues[key] ?? "";

            if (String(defaultValue) !== String(formValue)) {
                localIsDirty = true;
            }
        });

        if (isDirty && localIsDirty) {
            return;
        }

        setIsDirty(localIsDirty);
    }, [watch(), isDirty, file]);

    return [
        isDirty,
        setIsDirty
    ];
}