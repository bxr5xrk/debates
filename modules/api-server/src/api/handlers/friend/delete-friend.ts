import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { friendService } from "services/friend";
import { inviteService } from "services/invite";


async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;
  const friendId = (params as { id: number }).id;

  if (!user){
    throw Error("User is unauthorized");
  }

  const firstSideFriendfriend = await friendService.getFriend(friendId);

  if (!firstSideFriendfriend){
    throw Error("Friend not found");
  }

  const secondSideFriend = await friendService.findFriendByUsers(firstSideFriendfriend.friend.id, user.id);

  await friendService.deleteFriend(firstSideFriendfriend.id);
  await friendService.deleteFriend(secondSideFriend.id);
  await inviteService.deleteInvite(secondSideFriend.invite.id);

  return rep.status(200).send(getResponse("success", [], `Friend deleted successfully.` ));
}

export const deleteFriend = defineHandler({
  handler
});