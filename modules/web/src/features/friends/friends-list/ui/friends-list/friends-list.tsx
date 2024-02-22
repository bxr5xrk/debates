import { useWhoami } from "@/features/auth";
import { useFriends } from "../../api";
import { FriendRemoveAction } from "@/features/friends/friends-remove";

export function FriendsList(): JSX.Element {
    const { data } = useFriends();
    const { data: whoami } = useWhoami();
    const friends = data?.data;

    return (
        <div className="border border-slate-300 p-10 rounded-md">
            <p>my nickname: @{whoami?.data.nickname}</p>
            <ul className="grid grid-cols-3 gap-2">
                {friends?.map((friend) => (
                    <li key={friend.id} className="bg-gray-100 p-4 rounded-lg">
                        <p>name: {friend.user.name}</p>
                        <p>nickname: @{friend.user.nickname}</p>
                        <p>email: {friend.user.email}</p>
                        <FriendRemoveAction friendId={friend.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}