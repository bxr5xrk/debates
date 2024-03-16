import { useInviteAccept } from "@/features/friends/invite-accept/api";
import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import Image from "next/image";

interface AcceptInviteActionProps {
    inviteId: number;
}

export function AcceptInviteAction(
    props: AcceptInviteActionProps
): JSX.Element {
    const { inviteId } = props;
    const { trigger } = useInviteAccept(inviteId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.invites, API.FRIENDS_ROUTES.friends],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Invite accepted successfully", "Failed to send invite"],
            res.status
        );
    }

    return (
        <div className="w-[20px] h-[20px]">
            <Image src={"/tick.svg"} width={100} height={100} alt={"cross"} onClick={onAccept} className="cursor-pointer w-[30px] hover:scale-[1.1]"/>
        </div>
    );
}
