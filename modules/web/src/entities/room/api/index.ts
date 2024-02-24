"use client";

import { API } from "@/shared/api/api-routes";
import { baseFetcher } from "@/shared/api/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import { GetOptions, GetResponse } from "@/shared/api/types";
import { RoomValidData } from "..";

export function useRoomValid<D = RoomValidData>(roomId: string, options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        `${API.ROOM_ROUTES.roomValid}/${roomId}`,
        baseFetcher({ method: "GET" }),
        { ...options, keepPreviousData: true }
    );
}
