import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export function useSocket(roomId: string, userId: number): Socket | null {
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