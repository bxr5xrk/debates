import { db } from "connectors/db";
import { InviteStatusEnum } from "db/enums/invite-status";
import { Invite } from "db/models/invite";
import { CreateInvitePayload, UpdateInvitePayload } from "./types";
import { In } from "typeorm";
import { friendService } from "services/friend";
import { userService } from "services/user";
import { InviteTypeEnum } from "db/enums/invite-type";
import { Room } from "db/models/room";
import { roomService } from "services/room";

class InviteService {
  private inviteRepository = db.getRepository(Invite);
  public async getReceivedInvites(userId: number, type: InviteTypeEnum): Promise<Invite[]> {
    return this.inviteRepository.find({
      where: { receiver: { id: userId }, status: InviteStatusEnum.PENDING, type },
      relations: ['sender'],
    });
  }

  public async getSentInvites(userId: number, type: InviteTypeEnum): Promise<Invite[]> {
    return this.inviteRepository.find({
      where: { sender: { id: userId }, status: InviteStatusEnum.PENDING, type },
      relations: ['receiver'],
    });
  }

  public async createInvite(invite: CreateInvitePayload, gameRoom?: Room): Promise<Invite> {
    const newInvite = this.inviteRepository.create({...invite, gameRoom});
    return this.inviteRepository.save(newInvite);
  }

  public async getInvite(inviteId: number): Promise<Invite> {
    if (!inviteId) {
      throw new Error("InviteId is required");
    }

    const invite = await this.inviteRepository.findOne({
      where: {id: inviteId},
      relations: ['sender', 'receiver', 'gameRoom']
    });

    if (!invite) {
      throw new Error('Invite not found');
    }

    return invite;
  }

  public async findInviteByUsers(senderId: number, receiverId: number, type: InviteTypeEnum): Promise<Invite | null> {
    if (!senderId || !receiverId) {
      throw new Error("Ids are required");
    }

    const invite = await this.inviteRepository.findOne({
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId }, status: In([InviteStatusEnum.PENDING, InviteStatusEnum.ACCEPTED]), type },
        { sender: { id: receiverId }, receiver: { id: senderId }, status: In([InviteStatusEnum.PENDING, InviteStatusEnum.ACCEPTED]), type },
      ],
      relations: ['sender', 'receiver', 'gameRoom'],
    });
    

    return invite;
  }

  public async updateInvite(inviteId: number, invite: UpdateInvitePayload): Promise<Invite> {
    if (!inviteId) {
      throw new Error("InviteId is required");
    }
    
    const existingInvite = await this.inviteRepository.findOne({
      where: {id: inviteId},
      relations: ['sender', 'receiver'],
    })

    if (!existingInvite) {
      throw new Error('Invite not found');
    }

    const updatedInvite = this.inviteRepository.merge(existingInvite, invite);
    return this.inviteRepository.save(updatedInvite);
  }

  public async deleteInvite(inviteId: number): Promise<any> {
    if (!inviteId) {
      throw new Error("InviteId is required");
    }

    await this.inviteRepository.delete(inviteId);
    return true; 
  }

  public async acceptInvite(id: number, userId: number): Promise<Invite | Room> {
    const invite = await this.getInvite(id);

    if(invite.receiver.id !== userId){
      throw new Error("You are not receiver");
    }

    if(invite.status === InviteStatusEnum.ACCEPTED){
      throw new Error("Invite is already accepted");
    } 

    const updatedInvite = await this.updateInvite(invite.id, {
      status: InviteStatusEnum.ACCEPTED
    });

    if (invite.type === InviteTypeEnum.FRIEND){
      await friendService.createFriend({
        user: updatedInvite.sender, friend: updatedInvite.receiver, invite: updatedInvite
      })
      await friendService.createFriend({
        user: updatedInvite.receiver, friend: updatedInvite.sender, invite: updatedInvite
      })
    }else if (invite.type === InviteTypeEnum.GAME){
      await roomService.joinRoom(invite.receiver.id, invite.gameRoom.code);
      return invite.gameRoom;
    }

    return updatedInvite;
  }

  public async rejectInvite(id: number, userId: number): Promise<Invite> {
    const invite = await this.getInvite(id);

    if(invite.receiver.id !== userId){
      throw new Error("You are not receiver");
    }

    const updatedInvite = await this.updateInvite(id, {
      status: InviteStatusEnum.REJECTED
    });

    return updatedInvite;
  }

  public async sendFriendInvite(senderId: number, receiverNickname?: string): Promise<Invite>{
    const sender = await userService.getUserById(senderId);

    if(!sender){
      throw new Error("Sender not found")
    }

    const receiver = await userService.getUserByNickname(receiverNickname);

    if(!receiver){
      throw new Error("Receiver not found")
    }
    const existingInvite = await this.findInviteByUsers(senderId, receiver.id, InviteTypeEnum.FRIEND)

    if (existingInvite){
      throw Error("Invite is already exist");
    }

    return await this.createInvite({sender, receiver, type: InviteTypeEnum.FRIEND});
  }

  public async sendGameInvite(senderId: number, roomId: number, receiverId?: number): Promise<Invite>{
    const sender = await userService.getUserById(senderId);

    if(!sender){
      throw new Error("Sender not found")
    }

    const receiver = await userService.getUserById(receiverId);

    if(!receiver || !receiverId){
      throw new Error("Receiver not found")
    }
    const existingInvite = await this.findInviteByUsers(senderId, receiverId, InviteTypeEnum.GAME)

    if (existingInvite){
      throw Error("Invite is already exist");
    }

    const room = await roomService.getRoomById(roomId);

    if(!room){
      throw new Error("Room not found")
    }

    return await this.createInvite({sender, receiver, type: InviteTypeEnum.GAME}, room);
  }
}

export const inviteService = new InviteService();