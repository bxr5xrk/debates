import { RoomStatusEnum } from "@/entities/room";
import { User } from "@/entities/user";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { CurrentTeamRes } from "../types";
import { redirect } from "next/navigation";

interface useEventListenerProps {
  socket: Socket | null;
  setCountdownReport: (countdown: number) => void;
  setCountdownTotal: (countdown: number) => void;
  setCountdownGrading: (countdown: number) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setCurrentTeam: (team: CurrentTeamRes) => void;
  setOnlineMembers: (members: User[]) => void;
  setStatus: (status: RoomStatusEnum) => void;
}

export function useEventListener(props: useEventListenerProps): void {
    const { socket, setCountdownGrading, setCountdownReport, setIsAdmin, setCountdownTotal, setCurrentTeam, setStatus, setOnlineMembers } = props;

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on('countdown-report', (time: number) => {
            setCountdownReport(time);
        });

        socket.on('countdown-total', (time: number) => {
            setCountdownTotal(time);
        });

        socket.on('countdown-grading', (time: number) => {
            setCountdownGrading(time);
        });

        socket.on('is-admin', (data: boolean) => {
            setIsAdmin(data);
        });

        socket.on("current-team", (data: CurrentTeamRes) => {
            setCurrentTeam(data);
        });

        socket.on('online-members', (members) => {
            setOnlineMembers(members);
        });

        socket.on('status', (data) => {
            if (data === RoomStatusEnum.ENDED) {
                redirect("/history");
            }

            setStatus(data);
        });
    }, [socket]);
}