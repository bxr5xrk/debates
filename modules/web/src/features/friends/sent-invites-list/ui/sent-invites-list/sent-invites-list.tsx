import { AcceptInviteAction } from "@/features/friends/invite-accept";
import { useSentInvites } from "../../api";
import { RejectInviteAction } from "@/features/friends/invite-reject";

export function SentInvitesList(): JSX.Element {
    const { data } = useSentInvites();
    const invites = data?.data;

    return (
        <div className="border border-slate-300 p-10 rounded-md">
            <p>sent invites list</p>
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