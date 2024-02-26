import { Friend } from "@/entities/friend";
import { SelectOption } from "@/shared/ui";

export function getOptions(friends: Friend[], blacklistIds: string[], currentUserId?: number): SelectOption[] {
    if (!friends.length || !currentUserId) {
        return [];
    }

    const options = friends?.map((friend) => ({
        label: friend.friend.nickname,
        value: String(friend.friend.id),
    }));

    return [
        ...options,
        {
            label: "Me",
            value: String(currentUserId),
        }
    ].map(friend => ({ ...friend, disabled: blacklistIds.includes(friend.value) }));
}

