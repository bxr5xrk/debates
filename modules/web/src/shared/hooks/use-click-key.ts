import { useEffect } from "react";

export function useClickKey(
    keys: string[],
    handler: VoidFunction,
    skip: boolean
): void {
    useEffect(() => {
        function handleEsc(e: KeyboardEvent): void {
            if (keys.includes(e.key) && !skip) {
                handler();
            }
        }

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [skip, handler, keys]);
}