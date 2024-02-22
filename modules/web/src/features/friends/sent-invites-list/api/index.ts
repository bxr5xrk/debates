"use client";

import { API } from "@/shared/api/api-routes";
import { baseFetcher } from "@/shared/api/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import { GetOptions, GetResponse } from "@/shared/api/types";
import { Invites } from "../types";

export function useSentInvites<D = Invites>(options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        API.FRIENDS_ROUTES.sentInvites,
        baseFetcher({ method: "GET" }),
        options
    );
}
