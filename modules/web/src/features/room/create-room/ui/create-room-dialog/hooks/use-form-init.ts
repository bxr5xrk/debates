import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch, useForm } from "react-hook-form";
import { useCreateRoom } from "../../../api";
import { CreateRoomFormData, CreateRoomPayload } from "../../../types";
import { TriggerWithArgs } from "swr/mutation";
import { AxiosError, AxiosResponse } from "axios";
import { Room } from "@/entities/room";
import { BaseResponse } from "@/shared/types";

export function useFormInit(): {
    isMutating: boolean;
    register: UseFormRegister<CreateRoomFormData>
    handleSubmit: UseFormHandleSubmit<CreateRoomFormData, CreateRoomFormData>
    control: Control<CreateRoomFormData, CreateRoomFormData>
    errors: FieldErrors<CreateRoomFormData>
    watch: UseFormWatch<CreateRoomFormData>
    setValue: UseFormSetValue<CreateRoomFormData>
    trigger: TriggerWithArgs<AxiosResponse<BaseResponse<Room>>, AxiosError<unknown>, string, CreateRoomPayload>
    } {
    const { trigger, isMutating } = useCreateRoom();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateRoomFormData>();

    return {
        trigger,
        isMutating,
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        errors,
    };
}