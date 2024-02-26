import { Room } from "@/entities/room";
import { BaseResponse } from "@/shared/types";

export interface GradeRoomPayload {
    team: 'conTeam' | 'proTeam';
}

export type GradeRoomData = BaseResponse<Room>