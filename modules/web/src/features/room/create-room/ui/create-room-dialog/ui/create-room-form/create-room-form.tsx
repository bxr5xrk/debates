import { useAfterFetch } from "@/shared/hooks";
import { useFormInit } from "./hooks/use-form-init";
import { getPayload } from "../../lib/get-payload";
import { CreateRoomFormData } from "@/features/room/create-room/types";
import { Button, InputWithLabel } from "@/shared/ui";
import { validations } from "@/shared/lib";
import { MembersSelect } from "../members-select";
import { useRouter } from "next/navigation";

export function CreateRoomForm(): JSX.Element {
    const { register, control, errors, handleSubmit, isMutating, trigger, watch, setValue, proTeamIds, conTeamIds, triggerField } = useFormInit();
    const { onAfterFetch } = useAfterFetch({});
    const { push } = useRouter();

    async function onSubmit(data: CreateRoomFormData): Promise<void> {
        control._disableForm(true);
        const res = await trigger(getPayload(data));

        onAfterFetch(["Room created successfully", res?.data.message ?? "Something went wrong"], res.status);

        const id = res?.data?.data?.id;

        if (!id) {
            return;
        }

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

            <MembersSelect setValue={setValue} register={register} errors={errors} proTeamIds={proTeamIds} conTeamIds={conTeamIds} watch={watch} triggerField={triggerField} />

            <Button isLoading={isMutating} type="submit">Create</Button>
        </form>
    );
}
