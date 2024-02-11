import { API } from "@/shared/api/api-routes";
import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { SignOutData, SignOutPayload } from "../types";

export function useSignOut<D = SignOutData, P = SignOutPayload>(options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        API.AUTH_ROUTES.signOut,
        mutationFetcher({ method: "POST" }),
        options
    );
}
