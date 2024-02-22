import { InviteTypeEnum } from "@/features/friends";
import { useInviteSend } from "../../api";
import { useRef } from "react";
import { useAfterFetch } from "@/shared/hooks";

export function SendInviteForm(): JSX.Element {
    const { trigger, isMutating } = useInviteSend();
    const nicknameRef = useRef<HTMLInputElement>(null);
    const { onAfterFetch } = useAfterFetch({});

    async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if (!nicknameRef.current) {
            return;
        }

        const nickname = nicknameRef.current.value;

        const res = await trigger({ nickname, type: InviteTypeEnum.FRIEND });
        onAfterFetch(["Invite sent successfully", "Failed to send invite"], res.status);
        nicknameRef.current.value = "";
    }

    return (
        <form onSubmit={onSubmit}>
            <input ref={nicknameRef} type="text" placeholder="nickname Id" />
            <button type="submit" disabled={isMutating}>{isMutating ? "Loading..." : "send"}</button>
        </form>
    );
}