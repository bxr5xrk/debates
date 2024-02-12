import { db } from "connectors/db";
import { InviteStatusEnum } from "db/enums/invite-status.enum";
import { Invite } from "db/models/invite.entity";
import { CreateInvitePayload, UpdateInvitePayload } from "./types";
import { In } from "typeorm";

class InviteService {
  private inviteRepository = db.getRepository(Invite);
  public async getReceivedInvites(userId: number): Promise<Invite[]> {
    return this.inviteRepository.find({
      where: { receiver: { id: userId }, status: InviteStatusEnum.PENDING },
      relations: ['sender'],
    });
  }

  public async getSentInvites(userId: number): Promise<Invite[]> {
    return this.inviteRepository.find({
      where: { sender: { id: userId }, status: InviteStatusEnum.PENDING },
      relations: ['receiver'],
    });
  }

  public async createInvite(invite: CreateInvitePayload): Promise<Invite> {
    const newInvite = this.inviteRepository.create(invite);
    return this.inviteRepository.save(newInvite);
  }

  public async getInvite(inviteId: number): Promise<Invite> {
    if (!inviteId) {
      throw new Error("InviteId is required");
    }

    const invite = await this.inviteRepository.findOne({
      where: {id: inviteId},
      relations: ['sender', 'receiver']
    });

    if (!invite) {
      throw new Error('Invite not found');
    }

    return invite;
  }

  public async findInviteByUsers(senderId: number, receiverId: number): Promise<Invite | null> {
    if (!senderId || !receiverId) {
      throw new Error("Ids is required");
    }

    const invite = await this.inviteRepository.findOne({
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId }, status: In([InviteStatusEnum.PENDING, InviteStatusEnum.ACCEPTED]) },
        { sender: { id: receiverId }, receiver: { id: senderId }, status: In([InviteStatusEnum.PENDING, InviteStatusEnum.ACCEPTED]) },
      ],
      relations: ['sender', 'receiver'],
    });
    

    return invite;
  }

  public async updateInvite(inviteId: number, invite: UpdateInvitePayload): Promise<Invite> {
    if (!inviteId) {
      throw new Error("InviteId is required");
    }
    
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
    return { success: true }; 
  }
  
}

export const inviteService = new InviteService();