import { useFriends } from "@/entities/friend";
import { CreateRoomFormData } from "@/features/room/create-room/types";
import { DynamicSelect, InputWithLabel, Select, SelectContent, SelectTrigger, SelectValue } from "@/shared/ui";
import { useState } from "react";
import { FieldErrors, UseFieldArrayReturn, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { getOptions } from "../../lib/get-options";
import { validations } from "@/shared/lib";
import { useWhoami } from "@/features/auth";

interface MembersSelectProps {
    register: UseFormRegister<CreateRoomFormData>;
    errors: FieldErrors<CreateRoomFormData>;
    proTeamIds: UseFieldArrayReturn<CreateRoomFormData, "proTeamIds", "id">;
    conTeamIds: UseFieldArrayReturn<CreateRoomFormData, "conTeamIds", "id">;
    setValue: UseFormSetValue<CreateRoomFormData>;
    watch: UseFormWatch<CreateRoomFormData>;
    triggerField: UseFormTrigger<CreateRoomFormData>;
}

export function MembersSelect(props: MembersSelectProps): JSX.Element {
    const { register, errors, proTeamIds, conTeamIds, setValue, watch, triggerField } = props;
    const { data } = useFriends();
    const { data: whoami } = useWhoami();
    const friends = data?.data ?? [];
    const [blacklistIds, setBlacklistIds] = useState<string[]>([]);

    function onValue(e: string, name: "proTeamIds" | "conTeamIds" | "judgeId", index: number): void {
        switch (name) {
        case "judgeId":
            setValue("judgeId", e);
            triggerField(name);
            break;
        case "proTeamIds":
            proTeamIds.update(index, { id: e });
            triggerField(name);
            break;
        case "conTeamIds":
            conTeamIds.update(index, { id: e });
            triggerField(name);
            break;
        }

        // set blacklisted ids
        setBlacklistIds([watch("judgeId"), ...watch("conTeamIds").map((id) => id.id), ...watch("proTeamIds").map((id) => id.id)].filter(Boolean));
    }

    function onRemove(index: number, name: "proTeamIds" | "conTeamIds"): void {
        const isOneExists = name === "proTeamIds" ? proTeamIds.fields.length > 1 : conTeamIds.fields.length > 1;

        if (!isOneExists) {
            return;
        }

        const field = name === "proTeamIds" ? proTeamIds.fields[index] : conTeamIds.fields[index];

        name === "proTeamIds" ? proTeamIds.remove(index) : conTeamIds.remove(index);

        setBlacklistIds((prev) => prev.filter((id) => id !== field.id));
    }

    const options = getOptions(friends, blacklistIds, whoami?.data.id);

    return (
        <div className="flex flex-col gap-5 lg:w-1/2">
            <InputWithLabel label="Judge" htmlFor="judgeId" errorMessage={errors["judgeId"]?.message}>
                <Select onValueChange={(e) => onValue(e, "judgeId", 0)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a judge" />
                    </SelectTrigger>
                    <SelectContent options={options} {...register("judgeId", { ...validations.required })} />
                </Select>
            </InputWithLabel>

            <div className="flex flex-col gap-5 lg:flex-row lg:w-full">
                {/* proTeamIds */}
                <DynamicSelect
                    label="Pro Team"
                    htmlFor="proTeamIds"
                    fields={proTeamIds}
                    onAppend={() => proTeamIds.append({ id: "" })}
                    onRemove={(index) => onRemove(index, "proTeamIds")}
                    register={register}
                    options={options}
                    onUpdate={(index, e) => onValue(e, "proTeamIds", index)}
                    value={(index) => `proTeamIds.${index}.id`}
                    watch={watch}
                    errorMessage={errors.proTeamIds?.root?.message}
                />

                {/* conTeamIds */}
                <DynamicSelect
                    label="Con Team"
                    htmlFor="conTeamIds"
                    fields={conTeamIds}
                    onAppend={() => conTeamIds.append({ id: "" })}
                    onRemove={(index) => onRemove(index, "conTeamIds")}
                    register={register}
                    options={options}
                    onUpdate={(index, e) => onValue(e, "conTeamIds", index)}
                    value={(index) => `conTeamIds.${index}.id`}
                    watch={watch}
                    errorMessage={errors.conTeamIds?.root?.message}
                />
            </div>
        </div>
    );
}
