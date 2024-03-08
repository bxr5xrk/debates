import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { RoomData } from "@/shared/types/room";

export function useUnpublishRoom<D = RoomData, P = void>(payload: number, options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        `/rooms/${payload}/unpublish`,
        mutationFetcher({ method: "PUT" }),
        options
    );
}
