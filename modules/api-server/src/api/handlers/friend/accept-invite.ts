import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { InviteStatusEnum } from "db/enums/invite-status.enum";
import { friendService } from "services/friend";


async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;

  if (!user){
    throw Error("User is unauthorized");
  }

  const invite = await inviteService.getInvite((params as { id: number }).id);

  if(invite.receiver.id !== user.id){
    throw Error("You are not receiver");
  }

  if(invite.status === InviteStatusEnum.ACCEPTED){
    throw Error("Invite is already accepted");
  }

  const updatedInvite = await inviteService.updateInvite(invite.id, {
    status: InviteStatusEnum.ACCEPTED
  });
  const firstSideFriend = await friendService.createFriend({
    user: updatedInvite.sender, friend: updatedInvite.receiver, invite: updatedInvite
  })
  const secondSideFriend = await friendService.createFriend({
    user: updatedInvite.receiver, friend: updatedInvite.sender, invite: updatedInvite
  })
  
  return rep.status(200).send(getResponse("success", {firstSideFriend, secondSideFriend}));
}

export const acceptInvite = defineHandler({
  handler
});