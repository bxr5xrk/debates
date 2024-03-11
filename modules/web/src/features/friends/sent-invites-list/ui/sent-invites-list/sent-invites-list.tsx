import { useSentInvites } from "../../api";
import ProfileImg from "@/shared/ui/profileImg/profileImg";
import { Text } from "@/shared/ui";

export function SentInvitesList(): JSX.Element {
    const { data } = useSentInvites();
    const invites = data?.data;

    return (
        <div className="w-2/5">
            <Text classes={["text-2xl"]}>Sent Invitions</Text>
            <ul className="flex-col gap-1">
                {invites?.map((invite) => (
                    <li
                        key={invite.id}
                        className="flex gap-[30px] items-center p-3"
                    >
                        <ProfileImg
                            src={invite.receiver.picture}
                        />
                        <p className="h-min font-bold">
                            {invite.receiver.nickname}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
