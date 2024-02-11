import { useWhoami } from "@/features/auth";
import { Middleware, SWRHook } from "swr";

export const authMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const { data, error } = useWhoami();

    const isLoggedIn = data?.data.id && !error;

    if (!isLoggedIn) {
        return useSWRNext(null, fetcher, config);
    }

    return useSWRNext(key, fetcher, config);
};