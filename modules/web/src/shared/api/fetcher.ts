import { ENV } from "@/platform/env";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface MutationFetcherArgs<T> {
    arg: T;
}

const instance = axios.create({
    baseURL: ENV.NEXT_PUBLIC_API_URI,
    withCredentials: true,
});

export function baseFetcher(config: AxiosRequestConfig) {
    return async (url: string) => {
        config.url ??= url;

        try {
            const response = await instance.request({ ...config, withCredentials: true });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.statusText || error.message;

                console.error(errorMessage);

                throw new Error(errorMessage);
            }
        }
    };
}

export function mutationFetcher<T>(config: AxiosRequestConfig<T>) {
    return async (url: string, { arg }: MutationFetcherArgs<T>) => {
        config.url ??= url;

        try {
            const response = await instance.request({
                ...config,
                data: arg,
                withCredentials: true,
            });

            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data ?? error.response?.statusText;

                console.error(errorMessage);

                return errorMessage;
            }
        }
    };
}
