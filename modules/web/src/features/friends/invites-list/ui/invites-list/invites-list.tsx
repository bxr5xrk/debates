"use client";

import { AcceptInviteAction } from "@/features/friends/invite-accept";
import { useInvites } from "../../api";
import { RejectInviteAction } from "@/features/friends/invite-reject";
import { SendInviteForm } from "@/features/friends/invite-send";
import { useState } from "react";
import { ProfileImg } from "@/shared/ui/profileImg";
import Image from "next/image";

export function InvitesList(): JSX.Element {
    const { data } = useInvites();
    const invites = data?.data;
    const [showInvites, setShowInvites] = useState(false);

   

    return (
        <div>
            <SendInviteForm
                setShowInvites={setShowInvites}
                showInvites={showInvites}
            />
            {showInvites && (
                <div
                    className="fixed border border-black border-width-4 
                w-1/2 h-1/2 p-4 mx-auto bg-zinc-200 top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2
                z-10
                "
                >
                    <button
                        onClick={() => setShowInvites(!showInvites)}
                        className="border border-black rounded-full absolute right-[-20px] top-[-20px] bg-red-500 text-black p-2 focus:outline-none bg-rose-600 hover:scale-105"
                    >
                        <Image
                            src={"./icons/cross.svg"}
                            alt="cross"
                            width={20}
                            height={20}
                        />
                    </button>
                    <p className="text-center text-3xl">invites list</p>
                    <ul>
                        {invites?.map((invite) => (
                            <li
                                key={invite.id}
                                className="bg-gray-100 p-4 rounded-lg flex gap-[20px] items-center"
                            >
                                <ProfileImg src={invite.sender.picture} />
                                <p>{invite.sender.nickname}</p>

                                <div className="grid grid-cols-2 gap-2">
                                    <AcceptInviteAction inviteId={invite.id} />
                                    <RejectInviteAction inviteId={invite.id} />
                                </div>
                            </li>
                        ))}
                        {!invites?.length && <p className="">no invites</p>}
                    </ul>
                </div>
            )}
        </div>
    );
}
