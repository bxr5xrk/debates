import { db } from "connectors/db";
import { Like } from "db/models/like";
import { roomService } from "services/room";
import { userService } from "services/user";

class LikeService {
  private likeRepository = db.getRepository(Like);

  public async likeRoom(roomId: number, userId: number): Promise<Like> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await roomService.getRoomById(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (!room.isPublic) {
      throw new Error("Room is non-public");
    }
  
    const user = await userService.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const like = await this.likeRepository.findOne({
      where: { room: { id: room.id }, user: { id: user.id } }
    })

    if (like) {
      throw new Error("Room is already liked");
    }

    const newLike = this.likeRepository.create({user, room});

    return await this.likeRepository.save(newLike);
  }

  public async unlikeRoom(roomId: number, userId: number): Promise<boolean> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }

    const like = await this.likeRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } }
    })

    if (!like){
      throw new Error("Like not found");
    }

    await this.likeRepository.delete(like.id);

    return true;
  }

  public async findLike(roomId: number, userId: number): Promise<Like | null> {
    const like = await this.likeRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } }
    })

    return like;
  }

}

export const likeService = new LikeService();