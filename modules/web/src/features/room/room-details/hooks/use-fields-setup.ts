import { RoomStatusEnum } from "@/entities/room";
import { User } from "@/entities/user";
import { useState } from "react";
import { CurrentTeamRes } from "../types";

interface UseFieldsSetup {
  status: RoomStatusEnum | null;
  setStatus: (status: RoomStatusEnum) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onlineMembers: User[];
  setOnlineMembers: (members: User[]) => void;
  currentTeam: CurrentTeamRes | null;
  setCurrentTeam: (team: CurrentTeamRes) => void;
  countdownReport: number;
  setCountdownReport: (countdown: number) => void;
  countdownTotal: number;
  setCountdownTotal: (countdown: number) => void;
  countdownGrading: number;
  setCountdownGrading: (countdown: number) => void;
}

export function useFieldsSetup(): UseFieldsSetup {
    const [status, setStatus] = useState<RoomStatusEnum | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [onlineMembers, setOnlineMembers] = useState<User[]>([]);
    const [currentTeam, setCurrentTeam] = useState<null | CurrentTeamRes>(null);
    const [countdownReport, setCountdownReport] = useState<number>(0);
    const [countdownTotal, setCountdownTotal] = useState<number>(0);
    const [countdownGrading, setCountdownGrading] = useState<number>(0);

    return {
        status,
        setStatus,
        isAdmin,
        setIsAdmin,
        onlineMembers,
        setOnlineMembers,
        currentTeam,
        setCurrentTeam,
        countdownReport,
        setCountdownReport,
        countdownTotal,
        setCountdownTotal,
        countdownGrading,
        setCountdownGrading
    };
}