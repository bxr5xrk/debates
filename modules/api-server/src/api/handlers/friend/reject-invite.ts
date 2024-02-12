import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { InviteStatusEnum } from "db/enums/invite-status.enum";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;
  const inviteId = (params as { id: number }).id;

  if (!user){
    throw Error("User is unauthorized");
  }

  const invite = await inviteService.getInvite(inviteId);

  if(invite.receiver.id !== user.id){
    throw Error("You are not receiver");
  }

  const updatedInvite = await inviteService.updateInvite(inviteId, {status: InviteStatusEnum.REJECTED});
  
  return rep.status(200).send(getResponse("success", updatedInvite));
}

export const rejectInvite = defineHandler({
  handler
});