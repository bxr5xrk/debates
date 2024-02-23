'use client';

import { Button, InputWithLabel, Select, SelectContent, SelectOption, SelectTrigger, SelectValue } from "@/shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { useFormInit } from "./hooks/use-form-init";
import { useAfterFetch } from "@/shared/hooks";
import { CreateRoomFormData, CreateRoomPayload } from "../../types";
import { useFriends } from "@/features/friends/friends-list/api";
import { validations } from "@/shared/lib";
import { Friend } from "@/entities/friend";
import { useState } from "react";
import { ArrayPath, FieldErrors, Path, UseFieldArrayReturn, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch, set } from "react-hook-form";

export function CreateRoomDialog(): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger>Create Room</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new room</DialogTitle>
                    <CreateRoomForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

function CreateRoomForm(): JSX.Element {
    const { register, control, errors, handleSubmit, isMutating, trigger, watch, setValue, proTeamIds, conTeamIds, triggerField } = useFormInit();
    const { onAfterFetch } = useAfterFetch({});

    async function onSubmit(data: CreateRoomFormData): Promise<void> {
        control._disableForm(true);
        console.log('payload: ', getPayload(data));
        // const res = await trigger(getPayload(data));

        // onAfterFetch(["Room created successfully", res?.data.message ?? "Something went wrong"], res.status);

        // console.log({ res });
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

interface MembersSelectProps {
    register: UseFormRegister<CreateRoomFormData>;
    errors: FieldErrors<CreateRoomFormData>;
    proTeamIds: UseFieldArrayReturn<CreateRoomFormData, "proTeamIds", "id">;
    conTeamIds: UseFieldArrayReturn<CreateRoomFormData, "conTeamIds", "id">;
    setValue: UseFormSetValue<CreateRoomFormData>;
    watch: UseFormWatch<CreateRoomFormData>;
    triggerField: UseFormTrigger<CreateRoomFormData>
}

export function MembersSelect(props: MembersSelectProps): JSX.Element {
    const { register, errors, proTeamIds, conTeamIds, setValue, watch, triggerField } = props;
    const { data } = useFriends();
    const friends = data?.data ?? [];
    const [blacklistIds, setBlacklistIds] = useState<string[]>([]);

    function onValue(e: string, name: 'proTeamIds' | 'conTeamIds' | 'judgeId', index: number): void {
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

    function onRemove(index: number, name: 'proTeamIds' | 'conTeamIds'): void {
        const isOneExists = name === 'proTeamIds' ? proTeamIds.fields.length > 1 : conTeamIds.fields.length > 1;

        if (!isOneExists) {
            return;
        }

        const field = name === 'proTeamIds' ? proTeamIds.fields[index] : conTeamIds.fields[index];

        name === 'proTeamIds' ? proTeamIds.remove(index) : conTeamIds.remove(index);

        setBlacklistIds((prev) => prev.filter((id) => id !== field.id));
    }

    const options = getOptions(friends, blacklistIds);

    return (
        <>
            <InputWithLabel label="Judge" htmlFor="judgeId" errorMessage={errors['judgeId']?.message} >
                <Select onValueChange={(e) => onValue(e, "judgeId", 0)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a judge" />
                    </SelectTrigger>
                    <SelectContent options={options} {...register("judgeId", { ...validations.required })} />
                </Select>
            </InputWithLabel >

            {/* proTeamIds */}
            <DynamicSelect label="Pro Team" htmlFor="proTeamIds"
                fields={proTeamIds} onAppend={() => proTeamIds.append({ id: '' })
                }
                onRemove={(index) => onRemove(index, 'proTeamIds')} register={register}
                options={options} onUpdate={(index, e) => onValue(e, "proTeamIds", index)}
                value={(index) => `proTeamIds.${index}.id`} watch={watch} errorMessage={errors.proTeamIds?.root?.message}
            />

            {/* conTeamIds */}
            <DynamicSelect label="Con Team" htmlFor="conTeamIds"
                fields={conTeamIds} onAppend={() => conTeamIds.append({ id: '' })}
                onRemove={(index) => onRemove(index, 'conTeamIds')} register={register}
                options={options} onUpdate={(index, e) => onValue(e, "conTeamIds", index)}
                value={(index) => `conTeamIds.${index}.id`} watch={watch} errorMessage={errors.conTeamIds?.root?.message}
            />
        </>
    );
}

interface DynamicSelectProps<F extends object, T extends ArrayPath<F>> {
    label: string;
    htmlFor: string;
    fields: UseFieldArrayReturn<F, T, "id">
    onAppend: VoidFunction;
    onRemove: (index: number) => void;
    register: UseFormRegister<F>;
    options: SelectOption[];
    onUpdate: (index: number, value: string) => void;
    value: (index: number) => Path<F>;
    watch: UseFormWatch<F>;
    errorMessage?: string
}

export function DynamicSelect<F extends object, T extends ArrayPath<F>>(props: DynamicSelectProps<F, T>): JSX.Element {
    const { label, htmlFor, fields, onAppend, onRemove, register, options, onUpdate, value, watch, errorMessage } = props;

    return (
        <div>
            <InputWithLabel label={label} htmlFor={htmlFor}>
                <ul>
                    {fields.fields.map((field, index) => (
                        <li key={field.id}>
                            <Select key={field.id} onValueChange={(e) => onUpdate(index, e)} value={watch(value(index))}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a pro team" />
                                </SelectTrigger>
                                <SelectContent options={options} {...register(value(index))} />
                            </Select>
                            <button type="button" onClick={() => onRemove(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </InputWithLabel>
            {errorMessage && <span className="text-red-500">{errorMessage}</span>}
            <button
                type="button" onClick={onAppend}
            >
                append
            </button>
        </div>
    );
}

function getOptions(friends: Friend[], blacklistIds: string[]): SelectOption[] {
    // if (!friends.length) return [];

    // return friends
    //     .filter((friend) => !blacklistIds.includes(String(friend.id)))
    //     .map((friend) => ({
    //         label: friend.friend.nickname,
    //         value: String(friend.id),
    //     }));

    return [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
    ]
        .map(friend => ({ ...friend, disabled: blacklistIds.includes(friend.value) }));
}

function getPayload(data: CreateRoomFormData): CreateRoomPayload {
    return {
        topic: data.topic,
        judgeId: Number(data.judgeId),
        proTeamIds: data.proTeamIds.map((e) => Number(e.id)),
        conTeamIds: data.conTeamIds.map((e) => Number(e.id)),
        reportTime: data.reportTime,
    };
}