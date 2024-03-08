import { Control, FieldErrors, UseFieldArrayReturn, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch, useFieldArray, useForm } from "react-hook-form";
import { useCreateRoom } from "../../../../../api";
import { CreateRoomFormData, CreateRoomPayload } from "../../../../../types";
import { TriggerWithArgs } from "swr/mutation";
import { AxiosError, AxiosResponse } from "axios";
import { Room } from "@/shared/types";
import { BaseResponse } from "@/shared/types";
import { conTeamIdsRules, proTeamIdsRules } from "../../../const";

export function useFormInit(): {
    isMutating: boolean;
    register: UseFormRegister<CreateRoomFormData>
    handleSubmit: UseFormHandleSubmit<CreateRoomFormData, CreateRoomFormData>
    control: Control<CreateRoomFormData, CreateRoomFormData>
    errors: FieldErrors<CreateRoomFormData>
    watch: UseFormWatch<CreateRoomFormData>
    setValue: UseFormSetValue<CreateRoomFormData>
    trigger: TriggerWithArgs<AxiosResponse<BaseResponse<Room>>, AxiosError<unknown>, string, CreateRoomPayload>
    conTeamIds: UseFieldArrayReturn<CreateRoomFormData, "conTeamIds", "id">
    proTeamIds: UseFieldArrayReturn<CreateRoomFormData, "proTeamIds", "id">
    triggerField: UseFormTrigger<CreateRoomFormData>
    } {
    const { trigger, isMutating } = useCreateRoom();
    const {
        register,
        handleSubmit,
        control,
        watch,
        trigger: triggerField,
        setValue,
        formState: { errors },
    } = useForm<CreateRoomFormData>({ defaultValues: { proTeamIds: [{ id: '' }], conTeamIds: [{ id: '' }] } });
    const proTeamIds = useFieldArray({
        name: "proTeamIds", control, rules: proTeamIdsRules
    });
    const conTeamIds = useFieldArray({
        name: "conTeamIds", control, rules: conTeamIdsRules
    });

    return {
        trigger,
        isMutating,
        register,
        watch,
        setValue,
        handleSubmit,
        triggerField,
        control,
        errors,
        conTeamIds,
        proTeamIds,
    };
}
