import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { InviteTypeEnum } from "db/enums/invite-type";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const invites = await inviteService.getSentInvites(user.id, InviteTypeEnum.GAME)
  
  return rep.status(200).send(getResponse("success", invites));
}

export const getSentGameInvites = defineHandler({
  handler
});