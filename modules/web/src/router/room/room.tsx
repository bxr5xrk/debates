"use client";

import { Room, RoomStatusEnum, useRoomValid } from "@/entities/room";
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

        socketIo.on("connect", () => {
            console.log("connected to socket");
        });

        socketIo?.emit("join");
        socketIo?.emit("current-team");
        socketIo?.emit("current-room");
        socketIo?.emit("is-admin");
        socketIo?.emit("online-members");

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socket;
}

interface CurrentTeamRes {
    currentTeamType: "proTeam" | "conTeam";
    teamMembers: User[];
    isTeamMember: boolean;
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
    const [currentTeam, setCurrentTeam] = useState<null | CurrentTeamRes>(null);
    const [currentRoom, setCurrentRoom] = useState<null | Room>(null);
    const [countdownReport, setCountdownReport] = useState<number>(0);
    const [countdownTotal, setCountdownTotal] = useState<number>(0);
    const [countdownGrading, setCountdownGrading] = useState<number>(0);
    // const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    // const isJurge = currentRoom?.judge.id === userId;
    const socket = useSocket(roomId, userId);

    useEffect(() => {
        // if (!socket) {
        //     return;
        // }

        socket?.on("connect", () => {
            console.log("connected");
            socket.emit("join");
        });

        // socket.connect();
        // socket.on("connect", () => {
        //     console.log("connected");
        //     socket.emit("current-room");

        //     socket.on('is-admin', (isAdminRes: boolean) => {
        //         console.log(isAdminRes);
        //         setIsAdmin(isAdminRes);

        //         socket.on("status", (statusRes) => {
        //             console.log(statusRes);
        //             setStatus(statusRes);

        //             if (statusRes !== "pending" && !isAdminRes) {
        //                 socket.emit("join");
        //             }
        //         });
        //     });
        // });

        // socket.on('countdown-report', (time: number) => {
        //     setCountdownReport(time);
        // });

        // socket.on('countdown-total', (time: number) => {
        //     setCountdownTotal(time);
        // });

        // socket.on('countdown-grading', (time: number) => {
        //     setCountdownGrading(time);
        // });

        socket?.on("current-team", (data: CurrentTeamRes) => {
            console.log({ data });
            setCurrentTeam(data);
        });

        socket?.on('online-members', (members) => {
            setOnlineMembers(members);
        });

        socket?.on("current-room", (room) => {
            setCurrentRoom(room);
        });

        // .on(`room-${roomId}`)

        socket?.on('status', (data) => {
            console.log(data);
            setStatus(data);
        });
    }, []);

    // function onEnd(): void {
    //     if (!socket || !isAdmin) {
    //         return;
    //     }

    //     socket.emit("end");
    // }

    // function onPause(): void {
    //     if (!socket || !isAdmin) {
    //         return;
    //     }

    //     socket.emit("pause");
    // }

    // function onStart(): void {
    //     if (!socket || !isAdmin) {
    //         return;
    //     }

    //     socket.emit("start");
    // }

    // function onResume(): void {
    //     if (!socket || !isAdmin) {
    //         return;
    //     }

    //     socket.emit("resume");
    // }

    // useEffect(() => {
    //     socket?.emit("join");
    //     socket?.emit("current-team");
    //     socket?.emit("current-room");
    //     socket?.emit("is-admin");
    //     socket?.emit("online-members");
    // }, [status]);

    return (
        <>
            <span className="text-2xl p-2 border rounded-lg">{status}</span>
            {/* <p onClick={() => {
                console.log(1);
                socket?.emit("join");
                socket?.emit("current-team");
                socket?.emit("current-room");
                socket?.emit("is-admin");
                socket?.emit("online-members");
            }}>countdown report: {countdownReport}</p> */}
            <p>countdown total: {countdownTotal}</p>
            <p>countdown grading: {countdownGrading}</p>
            <p>topic {currentRoom?.topic}</p>
            <p>judge {currentRoom?.judge.nickname}</p>
            <p>is admin {isAdmin.toString()}</p>
            {/* <div className="flex flex-col items-start">
                {isAdmin && status === RoomStatusEnum.PENDING && <button onClick={onStart}>Start</button>}
                {(isAdmin && status === RoomStatusEnum.STARTED || status === RoomStatusEnum.PAUSED) && <button onClick={onEnd}>End</button>}
                {isAdmin && status === RoomStatusEnum.STARTED && <button onClick={onPause}>Pause</button>}
                {isAdmin && status === RoomStatusEnum.STARTED && <button onClick={onResume}>Resume</button>}
            </div> */}
            <p>online members: {onlineMembers.length}</p>
            <pre className="text-xs">{JSON.stringify(onlineMembers, null, 2)}</pre>
            <p>current team</p>
            <pre className="text-xs">{JSON.stringify(currentTeam, null, 2)}</pre>
            <p>current room</p>
            <pre className="text-xs">{JSON.stringify(currentRoom, null, 2)}</pre>
        </>
    );
}