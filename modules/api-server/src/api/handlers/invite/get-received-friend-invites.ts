import { defineHandler, getResponse } from "api/lib";
import { InviteTypeEnum } from "db/enums/invite-type";
import { Server } from "platform/types";
import { inviteService } from "services/invite";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const invites = await inviteService.getReceivedInvites(user.id, InviteTypeEnum.FRIEND)
  
  return rep.status(200).send(getResponse("success", invites));
}

export const getReceivedFriendInvites = defineHandler({
  handler
});