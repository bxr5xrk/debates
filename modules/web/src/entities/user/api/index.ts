"use client";

import { API } from "@/shared/api/api-routes";
import { baseFetcher, formDataFetcher } from "@/shared/api/fetcher";
import { AxiosError, AxiosResponse } from "axios";
import useSWR from "swr";
import { GetOptions, GetResponse, MutationOptions, MutationResponse } from "@/shared/api/types";
import { Me } from "..";
import useSWRMutation from "swr/mutation";

export function useMe<D = Me>(options?: GetOptions<D>): GetResponse<D> {
    return useSWR<D, AxiosError, string>(
        API.USER.me,
        baseFetcher({ method: "GET" }),
        options
    );
}


export function useUserUpdate<D = Me, P = FormData>(options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        '/user',
        formDataFetcher({ method: "PUT" }),
        options
    );
}
