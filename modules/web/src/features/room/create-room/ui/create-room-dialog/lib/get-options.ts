import { Friend } from "@/entities/friend";
import { SelectOption } from "@/shared/ui";

export function getOptions(friends: Friend[], blacklistIds: string[]): SelectOption[] {
    if (!friends.length) return [];

    return friends.map((friend) => ({
        label: friend.friend.nickname,
        value: String(friend.id),
    }))
        .map(friend => ({ ...friend, disabled: blacklistIds.includes(friend.value) }));
}

