'use client';

import { Button, InputWithLabel, Select, SelectContent, SelectOption, SelectTrigger, SelectValue } from "@/shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { useFormInit } from "./hooks/use-form-init";
import { useAfterFetch } from "@/shared/hooks";
import { CreateRoomFormData, CreateRoomPayload } from "../../types";
import { useFriends } from "@/features/friends/friends-list/api";
import { validations } from "@/shared/lib";
import { Friend } from "@/entities/friend";
import { useEffect, useState } from "react";

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
    const { register, control, errors, handleSubmit, isMutating, trigger, watch, setValue } = useFormInit();
    const { onAfterFetch } = useAfterFetch({});
    const { data } = useFriends();
    const friends = data?.data ?? [];
    const [blacklistIds, setBlacklistIds] = useState<string[]>([]);
    console.log({ blacklistIds });

    useEffect(() => {
        const values = [watch("judgeId"), watch("proTeamIds"), watch("conTeamIds")].filter(Boolean);
        setBlacklistIds(values);

    }, [watch("judgeId"), watch("proTeamIds"), watch("conTeamIds")]);

    async function onSubmit(data: CreateRoomFormData): Promise<void> {
        control._disableForm(true);
        const res = await trigger(getPayload(data));

        onAfterFetch(["Room created successfully", res?.data.message ?? "Something went wrong"], res.status);

        console.log({ res });
        control._disableForm(false);
    }

    return (
        <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel label="Topic" htmlFor="topic" errorMessage={errors['topic']?.message}>
                <InputWithLabel.Input {...register("topic", { ...validations.required })} placeholder="Topic" />
            </InputWithLabel>
            <InputWithLabel label="Preparation Time" htmlFor="preparationTime" errorMessage={errors['preparationTime']?.message}>
                <InputWithLabel.Input {...register("preparationTime", { ...validations.required })} placeholder="Preparation Time" type="number" />
            </InputWithLabel>

            <InputWithLabel label="Report Time" htmlFor="reportTime" errorMessage={errors['reportTime']?.message}>
                <InputWithLabel.Input {...register("reportTime", { ...validations.required })} placeholder="Report Time" type="number" />
            </InputWithLabel>

            <InputWithLabel label="Grading Time" htmlFor="gradingTime" errorMessage={errors['gradingTime']?.message}>
                <InputWithLabel.Input {...register("gradingTime", { ...validations.required })} placeholder="Grading Time" type="number" />
            </InputWithLabel>

            <InputWithLabel label="Judge" htmlFor="judgeId" errorMessage={errors['judgeId']?.message}>
                <Select onValueChange={(e) => setValue("judgeId", e)} {...register("judgeId")}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a judge" />
                    </SelectTrigger>
                    <SelectContent options={getOptions(friends, blacklistIds)} {...register("judgeId")} />
                </Select>
            </InputWithLabel>

            <InputWithLabel label="Pro Team" htmlFor="proTeamIds" errorMessage={errors['proTeamIds']?.message}>
                <Select onValueChange={(e) => setValue("proTeamIds", e)} {...register("proTeamIds")}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a pro team" />
                    </SelectTrigger>
                    <SelectContent options={getOptions(friends, blacklistIds)} {...register("proTeamIds")} />
                </Select>
            </InputWithLabel>

            <InputWithLabel label="Con Team" htmlFor="conTeamIds" errorMessage={errors['conTeamIds']?.message}>
                <Select onValueChange={(e) => setValue("conTeamIds", e)} {...register("conTeamIds")}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a con team" />
                    </SelectTrigger>
                    <SelectContent {...register("conTeamIds")} options={getOptions(friends, blacklistIds)} />
                </Select>
            </InputWithLabel>

            <Button isLoading={isMutating} type="submit">Create</Button>
        </form>
    );
}

function getOptions(friends: Friend[], blacklistIds: string[]): SelectOption[] {
    if (!friends.length) return [];

    return friends
        .filter((friend) => !blacklistIds.includes(String(friend.id)))
        .map((friend) => ({
            label: friend.friend.nickname,
            value: String(friend.id),
        }));
}

function getPayload(data: CreateRoomFormData): CreateRoomPayload {
    return {
        topic: data.topic,
        judgeId: Number(data.judgeId),
        proTeamIds: [Number(data.proTeamIds)],
        conTeamIds: [Number(data.conTeamIds)],
        preparationTime: data.preparationTime,
        reportTime: data.reportTime,
        gradingTime: data.gradingTime,
    };
}