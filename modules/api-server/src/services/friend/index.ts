import { db } from "connectors/db";
import { Friend } from "db/models/friend.entity";
import { CreateFriendPayload } from "./types";

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

  public async getFriend(friendId: number): Promise<Friend>{
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

  public async deleteFriend(friendId: number): Promise<any> {
    if (!friendId) {
      throw new Error("FriendId is required");
    }

    await this.friendRepository.delete(friendId);
    return { success: true }; 
  }
}

export const friendService = new FriendService();