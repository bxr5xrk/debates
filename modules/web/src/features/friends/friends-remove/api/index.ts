import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { FriendsRemoveData, FriendsRemovePayload } from "../types";

export function useFriendRemove<D = FriendsRemoveData, P = void>(payload: FriendsRemovePayload, options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        `/friends/${payload}`,
        mutationFetcher({ method: "DELETE" }),
        options
    );
}
