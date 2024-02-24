"use client";

import { API } from "@/shared/api/api-routes";
import { baseFetcher } from "@/shared/api/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import { GetOptions, GetResponse } from "@/shared/api/types";
import { Friends } from "..";

export function useFriends<D = Friends>(options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        API.FRIENDS_ROUTES.friends,
        baseFetcher({ method: "GET" }),
        options
    );
}
