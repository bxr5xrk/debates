"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface RoomPageProps {
    roomId: string;
}

export function RoomPage(props: RoomPageProps): JSX.Element {
    const { roomId } = props;
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on("connect", () => {
            console.log("socket connected");

            socket.emit("joinRoom", 1, roomId);

            // socket.emit('startRoom', 1, 1);
        });

        socket.on("currentTeam", (currentTeam) => {
            console.log('currentTeam:', currentTeam);
        });

        socket.on(`members`, (data) => {
            console.log(data);
        });

        socket.on("countdownPreparation", (data) => {
            console.log('countdownPreparation:', data);
        });

        socket.on("countdownReport", (data) => {
            console.log('countdownReport:', data);
        });

        socket.on("countdownGrading", (data) => {
            console.log('countdownGrading:', data);
        });
    }, [socket]);

    return <div>
        Room {props.roomId}
    </div>;
}

function useSocket(): {
    socket: Socket | null;
    } {
    const [socket, setSocket] = useState<Socket | null>();

    useEffect(() => {
        const socketIo = io("http://127.0.0.1:3001", {
            reconnection: true,
            upgrade: true,
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