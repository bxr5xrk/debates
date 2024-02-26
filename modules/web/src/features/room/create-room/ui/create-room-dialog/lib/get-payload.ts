import { CreateRoomFormData, CreateRoomPayload } from "../../../types";

export function getPayload(data: CreateRoomFormData): CreateRoomPayload {
    return {
        topic: data.topic,
        judgeId: Number(data.judgeId),
        proTeamIds: data.proTeamIds.map((e) => Number(e.id)),
        conTeamIds: data.conTeamIds.map((e) => Number(e.id)),
        reportTime: data.reportTime,
        reportsNumber: data.reportsNumber
    };
}