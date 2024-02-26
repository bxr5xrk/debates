import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";

interface UseEmit {
    onEnd: () => void;
    onPause: () => void;
    onStart: () => void;
    onResume: () => void;
    onJoin: () => void;
    onRate: (team: "conTeam" | "proTeam") => void;
}

export function useEmit(socket: Socket | null, isAdmin: boolean): UseEmit {
    const { push } = useRouter();

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

    function onRate(team: "conTeam" | "proTeam"): void {
        if (!socket) {
            return;
        }

        socket.emit("rate", team);
        push(`/history`);
    }

    return {
        onEnd,
        onPause,
        onStart,
        onResume,
        onJoin,
        onRate,
    };
}