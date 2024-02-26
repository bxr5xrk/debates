import { useEffect } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside<T extends HTMLElement>(
    handler: () => void,
    ref: React.RefObject<T>
): void {
    useEffect(() => {
        function listener(e: Event): void {
            if (!e.target) {
                return;
            }

            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }

        DEFAULT_EVENTS.forEach((fn) => document.addEventListener(fn, listener));

        return () => {
            DEFAULT_EVENTS.forEach((fn) => document.removeEventListener(fn, listener));
        };
    }, [ref, handler]);
}