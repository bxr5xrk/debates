import { db } from "connectors/db";
import { Room } from "db/models/room";
import { CreateRoomPayload } from "./types";
import * as randomstring from 'randomstring';
import { RoomStatusEnum } from "db/enums/room-status";
import { In } from "typeorm";
import { userService } from "services/user";
import { User } from "db/models/user";
import { TeamsEnum } from "db/enums/teams";
import { CODE_CHARSET, CODE_LENGTH } from "lib/const";

class RoomService {
  private roomRepository = db.getRepository(Room);

  private async generateUniqueCode(codeLength: number, codeCharset: string): Promise<string> {
    const generatedCode = randomstring.generate({
      length: codeLength,
      charset: codeCharset,
    });

    const existingRoom = await this.roomRepository.findOne({ 
      where: { 
        code: generatedCode, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED]) 
      } 
    });

    if (!existingRoom) {
      return generatedCode;
    } else {
      return this.generateUniqueCode(codeLength, codeCharset);
    }
  }

  public async getUserEndedRooms(userId: number): Promise<Room[]> {
    if (!userId) {
      throw new Error("UserId is required");
    }

    return this.roomRepository.find({
      where: [
        { proTeam: { id: userId }, status: RoomStatusEnum.ENDED},
        { conTeam: { id: userId }, status: RoomStatusEnum.ENDED},
        { judge: { id: userId }, status: RoomStatusEnum.ENDED},
      ],
      relations: ['owner', 'judge', 'proTeam', 'conTeam', 'winners', 'members']
    });
  }

  public async createRoom(ownerId: number, judgeId: number, proTeamIds: number[], conTeamIds: number[], room: CreateRoomPayload): Promise<Room> {
    if (!ownerId || !proTeamIds || !conTeamIds) {
      throw new Error("Ids are required");
    }

    const owner = await userService.getUserById(ownerId);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const judge = await userService.getUserById(judgeId);

    if (!judge) {
      throw new Error("judge not found");
    }

    const proTeam = await userService.getUsersByIds(proTeamIds);

    if (!proTeam) {
      throw new Error("proTeam not found");
    }

    const conTeam = await userService.getUsersByIds(conTeamIds);

    if (!conTeam) {
      throw new Error("conTeam not found");
    }

    const generatedCode = await this.generateUniqueCode(CODE_LENGTH, CODE_CHARSET);

    const roomPayload = {...room, owner, judge, proTeam, conTeam, code: generatedCode};

    const newRoom = this.roomRepository.create(roomPayload);

    return this.roomRepository.save(newRoom);
  }

  public async getRoomById(id: number): Promise<Room> {
    if (!id) {
      throw new Error("RoomId is required");
    }

    const room = await this.roomRepository.findOne({
      where: {id},
      relations: ['owner', 'judge', 'proTeam', 'conTeam', 'winners', 'members']
    });

    if (!room) {
      throw new Error('Room not found');
    }

    return room;
  }

  public async getRoomByCode(code: string): Promise<Room> {
    if (!code) {
      throw new Error("Code is required");
    }

    const room = await this.roomRepository.findOne({
      where: {code, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED])},
      relations: ['owner', 'judge', 'proTeam', 'conTeam', 'winners', 'members']
    });

    if (!room) {
      throw new Error('Room not found');
    }

    return room;
  }

  public async startRoom(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await this.getRoomById(roomId);

    if(room.owner.id !== userId){
      throw new Error("You are not owner");
    }

    room.status = RoomStatusEnum.STARTED;
    return await this.roomRepository.save(room);
  }

  public async joinRoomByCode(userId: number, roomCode: string): Promise<Room> {
    if (!userId || !roomCode) {
      throw new Error("UserId and roomCode are required");
    }
    
    const room = await this.getRoomByCode(roomCode);
    const user = await userService.getUserById(userId) as User;
    
    if (!this.isLive(userId, room.id)) {
      throw new Error("User isn't in room");
    }

    room.members.push(user);
    return await this.roomRepository.save(room);
  }

  public async joinRoomById(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (!await this.isLive(userId, room.id)) {
      throw new Error("User isn't in room");
    }

    room.members.push(user);
    return await this.roomRepository.save(room);
  }

  public async endRoom(userId: number, roomId: number, winnerTeam: TeamsEnum): Promise<Room> {
    if (!userId || !roomId || !winnerTeam) {
      throw new Error("UserId, RoomId and Team are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (room.owner.id !== user.id && room.judge?.id !== user.id) {
      throw new Error("You are not owner or judge");
    }
    if (winnerTeam === TeamsEnum.CON_TEAM){
      room.winners = room.conTeam;
    }else if (winnerTeam === TeamsEnum.PRO_TEAM){
      room.proTeam = room.proTeam;
    }

    room.status = RoomStatusEnum.ENDED;
    return await this.roomRepository.save(room);
  }

  public async isLive(userId: number, roomId: number): Promise<boolean> {
    const user = await userService.getUserById(userId);

    if(!user){
      throw new Error("User not found");
    }

    const room = await this.getRoomById(roomId);

    if(!room){
      throw new Error("Room not found");
    }

    const usersInRoom = room.proTeam.concat(room.conTeam, room.judge);

    return usersInRoom.some(userInRoom => userInRoom.id === user.id);
  }

  public async leaveRoom(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }
    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (!room.members.some(member => member.id === user.id)){
      throw new Error("User is not a room member");
    }

    room.members = room.members.filter(member => member.nickname !== user.nickname);
    return await this.roomRepository.save(room);
  }
}

export const roomService = new RoomService();
