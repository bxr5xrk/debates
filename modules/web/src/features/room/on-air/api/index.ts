"use client";

import { BaseResponse } from "./../../../../shared/types/index";
import { API } from "@/shared/api/api-routes";
import { baseFetcher } from "@/shared/api/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import { GetOptions, GetResponse } from "@/shared/api/types";
import { Room } from "@/shared/types";

export function useOnAir<D = BaseResponse<Room> | null>(options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        API.ROOM_ROUTES.onAir,
        baseFetcher({ method: "GET" }),
        options
    );
}
