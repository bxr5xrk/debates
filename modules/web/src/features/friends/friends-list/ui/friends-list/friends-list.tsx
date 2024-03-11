"use client";

import { useFriends } from "@/entities/friend";
import { FriendRemoveAction } from "@/features/friends/friends-remove";
import { Text } from "@/shared/ui";
import ProfileImg from "@/shared/ui/profileImg/profileImg";

export function FriendsList(): JSX.Element {
    const { data } = useFriends();
    const friends = data?.data;

    return (
        <div className="bp-10 w-3/5">
            <Text classes={["text-2xl"]}>Your friends</Text>
            <ul className="">
                {friends?.map((friend) => (
                    <li
                        key={friend.id}
                        className="bg-gray-100 p-4 rounded-lg flex gap-[20px] items-center"
                    >
                        <ProfileImg src={friend.friend.picture} />
                        <p>{friend.friend.name}</p>
                        <FriendRemoveAction friendId={friend.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
