import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
// import { InviteAcceptData, InviteAcceptPayload } from "types";
import { RoomData } from "../../types";

export function usePublishRoom<D = RoomData, P = void>(payload: number, options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        `/rooms/${payload}/publish`,
        mutationFetcher({ method: "PUT" }),
        options
    );
}
