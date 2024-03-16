import { API } from "@/shared/api/api-routes";
import { useAfterFetch } from "@/shared/hooks";
import { useInviteReject } from "../../api";
import Image from "next/image";

interface RejectInviteActionProps {
    inviteId: number;
}

export function RejectInviteAction(
    props: RejectInviteActionProps
): JSX.Element {
    const { inviteId } = props;
    const { trigger } = useInviteReject(inviteId);
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.invites],
    });

    async function onAccept(): Promise<void> {
        const res = await trigger();
        onAfterFetch(
            ["Invite rejected successfully", "Failed to send invite"],
            res.status
        );
    }

    return (
        <Image src={"/cross.svg"} alt={"tick"} width={100} height={100} onClick={onAccept} className="cursor-pointer w-[30px] hover:scale-[1.1]"/>
    );
}
