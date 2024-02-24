"use client";

import { API } from "@/shared/api/api-routes";
import { baseFetcher } from "@/shared/api/fetcher";
import { AxiosError } from "axios";
import { WhoamiData } from "../types";
import useSWR from "swr";
import { GetOptions, GetResponse } from "@/shared/api/types";

export function useWhoami<D = WhoamiData>(options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        API.AUTH_ROUTES.whoami,
        baseFetcher({ method: "GET" }),
        {
            ...options,
            keepPreviousData: true,
        }
    );
}
