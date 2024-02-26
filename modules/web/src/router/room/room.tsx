"use client";

import { RoomStatusEnum, useRoomValid } from "@/entities/room";
import { User } from "@/entities/user";
import { useWhoami } from "@/features/auth";
import { Page } from "@/shared/layout/page";
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
            Room {roomId}
            <RoomDetails roomId={roomId} userId={userId} />
        </Page>
    );
}

function useSocket(roomId: string, userId: number): {
    socket: Socket | null
} {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io("http://127.0.0.1:3001", {
            reconnection: true,
            upgrade: true,
            query: {
                userId,
                roomId
            }
        });
        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return {
        socket
    };
}

interface RoomConnectProps {
    roomId: string;
    userId: number;
}

function RoomDetails(props: RoomConnectProps): JSX.Element {
    const { roomId, userId } = props;
    const [status, setStatus] = useState<RoomStatusEnum | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [onlineMembers, setOnlineMembers] = useState<User[]>([]);
    const [currentTeam, setCurrentTeam] = useState<null | string>(null);
    const { socket } = useSocket(roomId, userId);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on("connect", () => {
            socket.on('is-admin', (isAdminRes: boolean) => {
                setIsAdmin(isAdminRes);

                socket.on("status", (statusRes) => {
                    setStatus(statusRes);

                    if (statusRes !== "pending" && !isAdminRes) {
                        socket.emit("join");
                    }
                });
            });
        });

        socket.on("current-team", (team) => {
            setCurrentTeam(team);
        });

        socket.on('online-members', (members) => {
            setOnlineMembers(members);
        });

        socket.emit("current-room");

        socket.on("current-room", (room) => {
            console.log(room);
        });

        socket.on("status", (data) => {
            setStatus(data);
        });
    }, [socket]);

    function onEnd(): void {
        if (!socket || !isAdmin) {
            return;
        }

        socket.emit("end");
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

    return (
        <>
            <span className="text-2xl p-2 border rounded-lg">{status}</span>
            <div>
                {isAdmin && <button onClick={onStart}>Start</button>}
                {isAdmin && <button onClick={onEnd}>End</button>}
                {isAdmin && <button onClick={onResume}>Resume</button>}
            </div>
            <p>online members: {onlineMembers.length}</p>
            {onlineMembers.length && (
                <ul>
                    {onlineMembers.map((member) => (
                        <li key={member.id}>{member.name}</li>
                    ))}
                </ul>
            )}
            <p>current team: {currentTeam}</p>
            <pre className="text-xs">{JSON.stringify(currentTeam, null, 2)}</pre>
        </>
    );
}