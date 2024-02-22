import { Me, UserFormData, useMe, useUserUpdate } from "@/entities/user";
import { setPreviousValues } from "../lib/set-previous-values";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { TriggerWithArgs } from "swr/mutation";
import { AxiosError, AxiosResponse } from "axios";

export function useFormInit(): {
  data?: Me;
  trigger: TriggerWithArgs<AxiosResponse<Me>, AxiosError<unknown>, string, FormData>
  isMutating: boolean;
  register: UseFormRegister<UserFormData>
  handleSubmit: UseFormHandleSubmit<UserFormData, UserFormData>
  watch: ReturnType<typeof useForm>["watch"];
  control: Control<UserFormData, UserFormData>
  errors: FieldErrors<UserFormData>
  } {
    const { data } = useMe();
    const { trigger, isMutating } = useUserUpdate();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<UserFormData>({ values: setPreviousValues(data) });

    return {
        data,
        trigger,
        isMutating,
        register,
        handleSubmit,
        watch,
        control,
        errors,
    };
}