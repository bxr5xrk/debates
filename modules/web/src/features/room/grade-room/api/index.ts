import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { GradeRoomData, GradeRoomPayload } from "../types";

export function useGradeRoom<D = GradeRoomData, P = GradeRoomPayload>(roomId: number, options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        `/rooms/${roomId}/grade`,
        mutationFetcher({ method: "PUT" }),
        options
    );
}
