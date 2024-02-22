import { defineHandler, getResponse, defineSchema } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { Type as type } from "@sinclair/typebox";
import { InviteTypeEnum } from "db/enums/invite-type";

const schema = defineSchema({
  body: type.Object({
    type: type.Enum(InviteTypeEnum),
    roomId: type.Optional(type.Number()),
    nickname: type.Optional(type.String()),
    userId: type.Optional(type.Number())
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };

  if (body.type === InviteTypeEnum.GAME && !body.roomId) {
    throw new Error("RoomId is required");
  }

  let invite;

  if (body.type === InviteTypeEnum.FRIEND) {
    invite = await inviteService.sendFriendInvite(user.id, body.nickname);
  } else if (body.type === InviteTypeEnum.GAME && body.roomId) {
    invite = await inviteService.sendGameInvite(user.id, body.roomId, body.userId);
  }

  return rep.status(200).send(getResponse("success", invite));
}

export const sendInvite = defineHandler({
  schema,
  handler
});
