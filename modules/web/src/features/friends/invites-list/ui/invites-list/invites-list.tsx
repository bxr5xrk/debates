"use client";

import { AcceptInviteAction } from "@/features/friends/invite-accept";
import { useInvites } from "../../api";
import { RejectInviteAction } from "@/features/friends/invite-reject";
import { SendInviteForm } from "@/features/friends/invite-send";

export function InvitesList(): JSX.Element {
    const { data } = useInvites();
    const invites = data?.data;

    return (
        <div className="border border-slate-300 p-10 rounded-md">
            <SendInviteForm />
            <p>invites list</p>
            <ul className="grid grid-cols-3 gap-4">
                {invites?.map((invite) => (
                    <li key={invite.id} className="bg-gray-100 p-4 rounded-lg">
                        <p>from</p>
                        <p>{invite.sender.name}</p>
                        <p>{invite.sender.nickname}</p>
                        <p>{invite.sender.email}</p>

                        <div className="grid grid-cols-2 gap-2">
                            <AcceptInviteAction inviteId={invite.id} />
                            <RejectInviteAction inviteId={invite.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}