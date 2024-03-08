"use client";

import { API } from "@/shared/api/api-routes";
import { baseFetcher } from "@/shared/api/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import { GetOptions, GetResponse } from "@/shared/api/types";
import { RoomData, RoomValidData, RoomsData, PublicRoomsData } from "@/shared/types";

export function useRoomValid<D = RoomValidData>(roomId: string, options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        `${API.ROOM_ROUTES.isRoomValid}/${roomId}`,
        baseFetcher({ method: "GET" }),
        { ...options, keepPreviousData: true }
    );
}

export function useRoom<D = RoomData>(roomId: string, options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        `${API.ROOM_ROUTES.room}/${roomId}`,
        baseFetcher({ method: "GET" }),
        { ...options, keepPreviousData: true }
    );
}

export function useRooms<D = RoomsData>(options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        API.ROOM_ROUTES.roomHistory,
        baseFetcher({ method: "GET" }),
        { ...options, keepPreviousData: true }
    );
}

export function usePublicRooms<D = PublicRoomsData>(currentPage?: number, sortOrder: "ASC" | "DESC" = "DESC", options?: GetOptions<D>): GetResponse<D> {
    const route = currentPage ? `${API.ROOM_ROUTES.publicRooms}?order=${sortOrder}&page=${currentPage}` : API.ROOM_ROUTES.publicRooms;
    return useSWR<D, AxiosError, string>(
        route,
        baseFetcher({ method: "GET" }),
        { ...options, keepPreviousData: true }
    );
}






