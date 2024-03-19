"use client";

import { API } from "@/shared/api/api-routes";
import { useInviteSend } from "../../api";
import { useRef, useState } from "react";
import { useAfterFetch } from "@/shared/hooks";
import { Button, Text } from "@/shared/ui";
import { useWhoami } from "@/features/auth";

interface SendInviteFormProps {
    setShowInvites: (i: boolean) => void;
    showInvites: boolean;
}

export function SendInviteForm({
    setShowInvites,
    showInvites,
}: SendInviteFormProps): JSX.Element {
    const { trigger, isMutating } = useInviteSend();
    const nicknameRef = useRef<HTMLInputElement>(null);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.sentInvites],
    });
    const { data: whoami } = useWhoami();
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        e.preventDefault();

        setError("");

        if (!nicknameRef.current) {
            return;
        }

        const nickname = nicknameRef.current.value;

        if (nickname == whoami?.data.nickname) {
            setError("You cannot invite yourself as a friend!");
            nicknameRef.current.value = "";
            return;
        }

        const res = await trigger({ nickname });
        onAfterFetch(
            ["Invite sent successfully", "Failed to send invite"],
            res.status
        );
        nicknameRef.current.value = "";
    }

    return (
        <form onSubmit={onSubmit} className="flex pt-[20px] pb-[30px]">
            <div className="flex-col">
                <div className="flex gap-[20px]">
                    <input
                        required
                        ref={nicknameRef}
                        type="text"
                        placeholder="nickname Id"
                        className="border-2 border-black rounded-[10px] p-[10px] border-r-4 border-b-4 w-[900px]"
                    />
                    <button
                        className="w-full base-button   max-w-[140px] flex justify-center text-2xl
                    transition duration-1000 after:hover:bg-blackLight
                    after:content-[''] after:transition hover:text-white"
                        type="submit"
                        disabled={isMutating}
                    >
                        {isMutating ? "Loading..." : "send"}
                    </button>
                    <Button
                        onClick={() => setShowInvites(!showInvites)}
                        className="w-1/2 base-button flex justify-center text-2xl after:bg-amber-400
                    transition duration-1000 after:hover:bg-amber-500 font-normal
                    after:content-[''] after:transition hover:text-white"
                        type="button"
                    >
                        {!showInvites ? "Show" : "Hide"} received invitations
                    </Button>
                </div>
                <Text classes={["text-rose-600 text-1xl"]}>{error}</Text>
            </div>
        </form>
    );
}
