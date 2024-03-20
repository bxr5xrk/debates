import { AcceptInviteAction } from '@/features/friends/invite-accept';
import { RejectInviteAction } from '@/features/friends/invite-reject';
import { useInvites } from '@/features/friends/invites-list/api';
import { ProfileImg } from '@/shared/ui/profileImg';
import React from 'react';

export function ModalWindow(): JSX.Element {
    const { data } = useInvites();
    const invites = data?.data;
    
    return (
        <div className="absolute z-10 w-max top-[57px]" >
            <ul>
                {invites?.map((invite) => (
                    <li
                        key={invite.id}
                        className="bg-gray-100 p-4 rounded-lg flex gap-[20px] items-center base-button"
                    >
                        <ProfileImg src={invite.sender.picture} className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px]" />
                        <p className="text-[13px] lg:text-[25px]">{invite.sender.nickname}</p>
                        <div className="grid grid-cols-2 gap-[10px] items-center justify-center">
                            <AcceptInviteAction inviteId={invite.id} />
                            <RejectInviteAction inviteId={invite.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
