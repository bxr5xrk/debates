"use client";

import { useFriends } from "@/entities/friend";
import { FriendRemoveAction } from "@/features/friends/friends-remove";
import { Text } from "@/shared/ui";
import { ProfileImg } from "@/shared/ui/profileImg";

export function FriendsList(): JSX.Element {
    const { data } = useFriends();
    const friends = data?.data;

    return (
        <div className="bp-10 w-full flex  flex-col lg:w-3/5 align-middle md:align-baseline">
            <Text classes={["text-2xl"]}>Your friends</Text>
            <ul>
                {friends?.map((friend) => (
                    <li
                        key={friend.id}
                        className="bg-gray-100 p-4 rounded-lg flex gap-[20px] items-center"
                    >
                        <ProfileImg className="w-[80px] h-[80px]" src={friend.friend.picture}/>
                        <p>{friend.friend.name}</p>
                        <FriendRemoveAction friendId={friend.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
