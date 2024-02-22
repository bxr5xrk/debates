import { API } from "@/shared/api/api-routes";
import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { InviteSendData, InviteSendPayload } from "../types";

export function useInviteSend<D = InviteSendData, P = InviteSendPayload>(options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        API.FRIENDS_ROUTES.inviteSend,
        mutationFetcher({ method: "POST" }),
        options
    );
}
