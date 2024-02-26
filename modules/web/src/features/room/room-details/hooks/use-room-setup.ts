import { Room, useRoom } from "@/entities/room";
import { useSocket } from "./use-socket";
import { Socket } from "socket.io-client";

interface UseSetupRoom {
  room?: Room
  socket: Socket | null
  isJudge: boolean
}

export function useRoomSetup(roomId: string, userId: number): UseSetupRoom {
    const { data } = useRoom(roomId);
    const room = data?.data;
    const socket = useSocket(roomId, userId);
    const isJudge = room?.judge.id === userId;

    return {
        room,
        socket,
        isJudge
    };
}