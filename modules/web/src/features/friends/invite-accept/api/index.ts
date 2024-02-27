import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { InviteAcceptData, InviteAcceptPayload } from "../types";

export function useInviteAccept<D = InviteAcceptData, P = void>(payload: InviteAcceptPayload, options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        `/friends/accept-invite/${payload}`,
        mutationFetcher({ method: "PUT" }),
        options
    );
}
