import { Room } from "@/shared/types";
import { BaseResponse } from "@/shared/types";

export interface GradeRoomPayload {
    team: 'conTeam' | 'proTeam';
}

export type GradeRoomData = BaseResponse<Room>