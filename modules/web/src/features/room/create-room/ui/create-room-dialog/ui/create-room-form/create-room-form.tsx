import { useAfterFetch } from "@/shared/hooks";
import { useFormInit } from "./hooks/use-form-init";
import { getPayload } from "../../lib/get-payload";
import { CreateRoomFormData } from "@/features/room/create-room/types";
import { Button, InputWithLabel } from "@/shared/ui";
import { validations } from "@/shared/lib";
import { MembersSelect } from "../members-select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWhoami } from "@/features/auth";
import { API } from "@/shared/api/api-routes";

interface CreateRoomFormProps {
    afterCreate: VoidFunction;
}

export function CreateRoomForm(props: CreateRoomFormProps): JSX.Element {
    const { afterCreate } = props;
    const { register, control, errors, handleSubmit, isMutating, trigger, watch, setValue, proTeamIds, conTeamIds, triggerField } = useFormInit();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.ROOM_ROUTES.onAir],
    });
    const { data: whoami } = useWhoami();
    const { push } = useRouter();

    const [isMeSelected, setIsMeSelected] = useState<boolean | null>(null);

    async function onSubmit(data: CreateRoomFormData): Promise<void> {
        control._disableForm(true);
        const isMeSelectedLocal = [data.judgeId, ...data.proTeamIds.map((id) => id.id), ...data.conTeamIds.map((id) => id.id)].includes(
            String(whoami?.data.id)
        );
        setIsMeSelected(isMeSelectedLocal);

        if (!isMeSelectedLocal) {
            control._disableForm(false);
            return;
        }

        const res = await trigger(getPayload(data));

        onAfterFetch(["Room created successfully", (res as unknown as { message: string }).message ?? "Something went wrong"], res.status);

        const id = res?.data?.data?.id;

        if (!id) {
            return;
        }

        afterCreate();
        push(`/rooms/${id}`);
        control._disableForm(false);
    }

    return (
        <form className="flex flex-col items-center w-full h-full p-2 lg:p-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full sm:flex-[0_0_87px]">
                <InputWithLabel label="" htmlFor="topic" errorMessage={errors["topic"]?.message} className="w-full">
                    <InputWithLabel.Input {...register("topic", { ...validations.required })} placeholder="Debate topic" />
                </InputWithLabel>
            </div>

            <div className="w-full flex flex-col grow gap-5 lg:flex-row lg:justify-between">
                <div className="lg:w-[85%] xl:w-[75%]">
                    <MembersSelect
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        proTeamIds={proTeamIds}
                        conTeamIds={conTeamIds}
                        watch={watch}
                        triggerField={triggerField}
                    />
                </div>

                <div className="flex flex-col gap-5 max-lg:mt-3 xl:w-[20%]">
                    <div className="flex-[0_0_90px]">
                        <InputWithLabel label="Report Time" htmlFor="reportTime" errorMessage={errors["reportTime"]?.message}>
                            <InputWithLabel.Input
                                {...register("reportTime", {
                                    ...validations.required,
                                })}
                                placeholder="Enter a value"
                                type="number"
                            />
                        </InputWithLabel>
                    </div>

                    <div className="flex-[0_0_100px]">
                        <InputWithLabel label="Reports Number" htmlFor="reportsNumber" errorMessage={errors["reportsNumber"]?.message}>
                            <InputWithLabel.Input
                                {...register("reportsNumber", {
                                    ...validations.required,
                                })}
                                placeholder="Enter a value"
                                type="number"
                            />
                        </InputWithLabel>
                    </div>
                </div>
            </div>

            {isMeSelected === false && <p className="text-red-500">You need to select yourself</p>}
            <Button isLoading={isMutating} type="submit" className="w-full sm:flex-[0_0_48px] lg:w-64 lg:self-end lg:mt-auto">
                Play
            </Button>
        </form>
    );
}
