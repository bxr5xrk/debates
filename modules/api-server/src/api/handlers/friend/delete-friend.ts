import { defineHandler, defineSchema } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { friendService } from "services/friend";
import { inviteService } from "services/invite";

const schema = defineSchema({
  body: type.Object({
    userId: type.Number(),
    friendId: type.Number(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const firstSideFriendfriend = await friendService.findFriendByUsers(body.userId, body.friendId);
  if (!firstSideFriendfriend){
    throw Error("Friend not found");
  }
  const secondSideFriend = await friendService.findFriendByUsers(body.friendId, body.userId);

  await inviteService.deleteInvite(firstSideFriendfriend.invite.id)
  await friendService.deleteFriend(firstSideFriendfriend.id)
  await friendService.deleteFriend(secondSideFriend.id)

  return rep.status(200).send({ success: true, message: `Friend deleted successfully.` });
}

export const deleteFriend = defineHandler({
  schema,
  handler
});