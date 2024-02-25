"use client";

import { RoomStatusEnum, useRoom, useRoomValid } from "@/entities/room";
import { User } from "@/entities/user";
import { useWhoami } from "@/features/auth";
import { Page } from "@/shared/layout/page";
import { cl } from "@/shared/lib/cl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface RoomPageProps {
    roomId: string;
}

export function RoomPage(props: RoomPageProps): JSX.Element {
    const { roomId } = props;
    const { data: whoami, isLoading: isWhoamiLoading } = useWhoami();
    const { data, isLoading } = useRoomValid(roomId);
    const userId = whoami?.data.id;

    if (!data?.data?.code && !isLoading) {
        redirect("/");
    }

    if (!userId && !isWhoamiLoading) {
        return <></>;
    }

    if (!userId) {
        return <></>;
    }

    return (
        <Page>
            <RoomDetails roomId={roomId} userId={userId} />
        </Page>
    );
}

function useSocket(roomId: string, userId: number): Socket | null {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io("http://127.0.0.1:3001", {
            reconnection: true,
            upgrade: true,
            autoConnect: true,
            query: {
                userId,
                roomId
            },
            // transports: ["websocket", "polling"],
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socket;
}

interface CurrentTeamRes {
    currentTeamType: "proTeam" | "conTeam" | null;
    teamMembers: User[];
    isTeamMember: boolean;
}

interface RoomConnectProps {
    roomId: string;
    userId: number;
}

function RoomDetails(props: RoomConnectProps): JSX.Element {
    const { roomId, userId } = props;
    const { data } = useRoom(roomId);
    const room = data?.data;
    const [status, setStatus] = useState<RoomStatusEnum | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [onlineMembers, setOnlineMembers] = useState<User[]>([]);
    const [currentTeam, setCurrentTeam] = useState<null | CurrentTeamRes>(null);
    const [countdownReport, setCountdownReport] = useState<number>(0);
    const [countdownTotal, setCountdownTotal] = useState<number>(0);
    const [countdownGrading, setCountdownGrading] = useState<number>(0);
    const socket = useSocket(roomId, userId);

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
            console.log(data);
            setStatus(data);
        });
    }, [socket]);

    function onEnd(): void {
        if (!socket || !isAdmin) {
            return;
        }

        socket.emit("end");
    }

    function onPause(): void {
        if (!socket || !isAdmin) {
            return;
        }

        socket.emit("pause");
    }

    function onStart(): void {
        if (!socket || !isAdmin) {
            return;
        }

        socket.emit("start");
    }

    function onResume(): void {
        if (!socket || !isAdmin) {
            return;
        }

        socket.emit("resume");
    }

    function onJoin(): void {
        if (!socket) {
            return;
        }

        socket.emit("join");
    }

    return (
        <div className="flex flex-col gap-2">
            {!onlineMembers.find(i => i.id === userId) && <button onClick={onJoin} className="border p-2">join</button>}
            {isAdmin && status === RoomStatusEnum.PENDING && <button onClick={onStart} className="border p-2">start</button>}
            {(isAdmin && status === RoomStatusEnum.STARTED) && <button onClick={onPause} className="border p-2">pause</button>}
            {isAdmin && status === RoomStatusEnum.PAUSED && <button onClick={onResume} className="border p-2">resume</button>}
            {(isAdmin && status === RoomStatusEnum.STARTED || status === RoomStatusEnum.PAUSED) && <button onClick={onEnd} className="border p-2">end</button>}
            <span className="text-2xl p-2 border rounded-lg">{status}</span>
            <p>countdown total: {countdownTotal}s</p>
            <p>countdown report: {countdownReport}s</p>
            <p>countdown grading: {countdownGrading}s</p>
            <p>topic {room?.topic}</p>
            <p className="text-xl font-bold">is admin {isAdmin.toString()}</p>
            <p className="text-xl font-bold">judge</p>
            <div className={cl("border rounded-xl p-2", room?.judge.id === userId && "bg-green-100")}>
                <p>{room?.judge.nickname}</p>
                <p>{room?.judge.email}</p>
            </div>
            <p className="text-xl font-bold">online</p>
            <ul className="border rounded-xl p-2 flex flex-col gap-2">
                {onlineMembers.map((member) => (
                    <li key={member.id} className={cl("border rounded-xl p-2", member.id === userId && "bg-green-100")}>
                        <p>{member.nickname}</p>
                        <p>{member.email}</p>
                    </li>
                ))}
            </ul>
            <p className="text-xl font-bold">teams</p>
            <div className="grid grid-cols-2 gap-2">
                <ul className={cl("border rounded-xl p-2 flex flex-col gap-2 bg-blue-50", currentTeam?.currentTeamType === "proTeam" && 'border-blue-500')}>
                    {room?.proTeam.map((member) => (
                        <li key={member.id} className={cl("border rounded-xl p-2", member.id === userId && "bg-green-100")}>
                            <p>{member.nickname}</p>
                            <p>{member.email}</p>
                        </li>
                    ))}
                </ul>
                <ul className={cl("border rounded-xl p-2 flex flex-col gap-2 bg-red-50", currentTeam?.currentTeamType === "conTeam" && 'border-red-500')}>
                    {room?.conTeam.map((member) => (
                        <li key={member.id} className={cl("border rounded-xl p-2", member.id === userId && "bg-green-100")}>
                            <p>{member.nickname}</p>
                            <p>{member.email}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}