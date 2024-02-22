import { API } from "@/shared/api/api-routes";
import { formDataFetcher } from "@/shared/api/fetcher";
import { MutationOptions, MutationResponse } from "@/shared/api/types";
import { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { SignUpData } from "../types";

export function useSignUp<D = SignUpData, P = FormData>(options?: MutationOptions<D, P>): MutationResponse<D, P> {
    return useSWRMutation<AxiosResponse<D>, AxiosError, string, P, D>(
        API.AUTH_ROUTES.signUp,
        formDataFetcher({ method: "POST" }),
        options
    );
}
