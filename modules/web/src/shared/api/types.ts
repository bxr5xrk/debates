import { AxiosError, AxiosResponse } from "axios";
import { SWRConfiguration, SWRResponse } from "swr";
import { SWRMutationConfiguration, SWRMutationResponse } from "swr/mutation";

export type MutationOptions<D, P> = SWRMutationConfiguration<AxiosResponse<D>, AxiosError, string, P, D>;

export type MutationResponse<D, P> = SWRMutationResponse<AxiosResponse<D>, AxiosError, string, P>;

export type GetResponse<D> = SWRResponse<D, AxiosError>;

export type GetOptions<D> = SWRConfiguration<D, AxiosError>