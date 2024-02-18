import { defineHandler, getResponse, defineSchema } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { Type as type } from "@sinclair/typebox";
import { InviteTypeEnum } from "db/enums/invite-type";

const schema = defineSchema({
  body: type.Object({
    type: type.Enum(InviteTypeEnum),
    roomId: type.Optional(type.Number()),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const userId = (params as { userId: number }).userId;

  if (body.type === InviteTypeEnum.GAME && !body.roomId){
    throw new Error("RoomId is required");
  }

  const invite = body.type === InviteTypeEnum.FRIEND
    ? await inviteService.sendFriendInvite(user.id, userId)
    : body.type === InviteTypeEnum.GAME && body.roomId 
      ? await inviteService.sendGameInvite(user.id, userId, body.roomId) 
      : null;

  return rep.status(200).send(getResponse("success", invite));
}

export const sendInvite = defineHandler({
  schema,
  handler
});
