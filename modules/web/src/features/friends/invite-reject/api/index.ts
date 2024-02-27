import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { InviteRejectData, InviteRejectPayload } from "../types";

export function useInviteReject<D = InviteRejectData, P = void>(payload: InviteRejectPayload, options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        `/friends/reject-invite/${payload}`,
        mutationFetcher({ method: "PUT" }),
        options
    );
}
