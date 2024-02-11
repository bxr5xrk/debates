import { defineHandler } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { InviteStatusEnum } from "db/enums/invite-status.enum";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const updatedInvite = await inviteService.updateInvite((params as { id: number }).id, {status: InviteStatusEnum.REJECTED});
  
  return rep.status(200).send(updatedInvite);
}

export const rejectInvite = defineHandler({
  handler
});