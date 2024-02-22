import { useSentInvites } from "../../api";

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
                        <p>{invite.receiver.name}</p>
                        <p>{invite.receiver.nickname}</p>
                        <p>{invite.receiver.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}