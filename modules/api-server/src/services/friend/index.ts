import { db } from "connectors/db";
import { Friend } from "db/models/friend";
import { CreateFriendPayload } from "./types";
import { inviteService } from "services/invite";

class FriendService {
  private friendRepository = db.getRepository(Friend);
  public async getFriends(userId: number): Promise<Friend[]> {
    if (!userId) {
      throw new Error("UserId is required");
    }

    return this.friendRepository.find({
      where: { user: { id: userId }},
      relations: ['friend']
    });
  }

  public async getFriendById(friendId: number): Promise<Friend>{
    if (!friendId) {
      throw new Error("FriendId is required");
    }

    const friend = await this.friendRepository.findOne({
      where: {id: friendId},
      relations: ['friend']
    })

    if (!friend) {
      throw new Error("Friend not found");
    }

    return friend;
  }

  public async findFriendByUsers(userId: number, friendId: number): Promise<Friend> {
    if (!userId || !friendId) {
      throw new Error("Ids is required");
    }

    const friend = await this.friendRepository.findOne({
      where: {user: {id: userId}, friend: {id: friendId}},
      relations: ['user', 'friend', 'invite'],
    });

    if (!friend) {
      throw new Error('Friend not found');
    }

    return friend;
  }

  public async createFriend(friend: CreateFriendPayload): Promise<Friend> {
    const newFriend = this.friendRepository.create(friend);
    return this.friendRepository.save(newFriend);
  }

  public async deleteFriend(friendId: number, userId: number): Promise<any> {
    if (!friendId) {
      throw new Error("FriendId is required");
    }

    const firstSideFriend = await this.getFriendById(friendId);

    if (!firstSideFriend){
      throw new Error("Friend not found");
    }

    const secondSideFriend = await this.findFriendByUsers(firstSideFriend.friend.id, userId);
    await this.friendRepository.delete(firstSideFriend.id);
    await this.friendRepository.delete(secondSideFriend.id);
    await inviteService.deleteInvite(secondSideFriend.invite.id);

    return true; 
  }
}

export const friendService = new FriendService();