import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { CreateRoomData, CreateRoomPayload } from "../types";

export function useCreateRoom<D = CreateRoomData, P = CreateRoomPayload>(options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        '/rooms',
        mutationFetcher({ method: "POST" }),
        options
    );
}
