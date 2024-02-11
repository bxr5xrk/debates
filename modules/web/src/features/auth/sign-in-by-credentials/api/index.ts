import { API } from "@/shared/api/api-routes";
import { mutationFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { SignInData, SignInPayload } from "../types";

export function useSignIn<D = SignInData, P = SignInPayload>(options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        API.AUTH_ROUTES.signIn,
        mutationFetcher({ method: "POST" }),
        options
    );
}
