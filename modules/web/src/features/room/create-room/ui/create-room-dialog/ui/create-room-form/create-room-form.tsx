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

interface CreateRoomFormProps {
    afterCreate: VoidFunction;
}

export function CreateRoomForm(props: CreateRoomFormProps): JSX.Element {
    const { afterCreate } = props;
    const { register, control, errors, handleSubmit, isMutating, trigger, watch, setValue, proTeamIds, conTeamIds, triggerField } = useFormInit();
    const { onAfterFetch } = useAfterFetch({});
    const { data: whoami } = useWhoami();
    const { push } = useRouter();

    const [isMeSelected, setIsMeSelected] = useState<boolean | null>(null);

    async function onSubmit(data: CreateRoomFormData): Promise<void> {
        control._disableForm(true);
        const isMeSelectedLocal = [data.judgeId, ...data.proTeamIds.map((id) => id.id), ...data.conTeamIds.map((id) => id.id)].includes(String(whoami?.data.id));
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
        push(`/room/${id}`);
        control._disableForm(false);
    }

    return (
        <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel label="Topic" htmlFor="topic" errorMessage={errors['topic']?.message}>
                <InputWithLabel.Input {...register("topic", { ...validations.required })} placeholder="Topic" />
            </InputWithLabel>

            <InputWithLabel label="Report Time" htmlFor="reportTime" errorMessage={errors['reportTime']?.message}>
                <InputWithLabel.Input {...register("reportTime", { ...validations.required })} placeholder="Report Time" type="number" />
            </InputWithLabel>

            <InputWithLabel label="Reports Number" htmlFor="reportsNumber" errorMessage={errors['reportsNumber']?.message}>
                <InputWithLabel.Input {...register("reportsNumber", { ...validations.required })} placeholder="Reports Number" type="number" />
            </InputWithLabel>

            <MembersSelect setValue={setValue} register={register} errors={errors} proTeamIds={proTeamIds} conTeamIds={conTeamIds} watch={watch} triggerField={triggerField} />

            {isMeSelected === false && <p className="text-red-500">You need to select yourself</p>}
            <Button isLoading={isMutating} type="submit">Create</Button>
        </form>
    );
}
