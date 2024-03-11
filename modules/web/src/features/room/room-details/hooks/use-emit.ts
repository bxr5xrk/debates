import { API } from "@/shared/api/api-routes";
import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";
import { useSWRConfig } from "swr";

interface UseEmit {
    onEnd: VoidFunction;
    onPause: VoidFunction;
    onStart: VoidFunction;
    onResume: VoidFunction;
    onJoin: VoidFunction;
    onRate: (team: "conTeam" | "proTeam") => void;
    onSkip: VoidFunction;
}

export function useEmit(socket: Socket | null, isAdmin: boolean): UseEmit {
    const { push } = useRouter();
    const { mutate } = useSWRConfig();

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

        mutate(API.ROOM_ROUTES.onAir);
        socket.emit("rate", team);
        push(`/games`);
    }

    function onSkip(): void {
        if (!socket) {
            return;
        }

        socket.emit("skip");
    }

    return {
        onEnd,
        onPause,
        onStart,
        onResume,
        onJoin,
        onRate,
        onSkip
    };
}