import { db } from "connectors/db";
import { Room } from "db/models/room";
import { CreateRoomPayload } from "./types";
import * as randomstring from 'randomstring';
import { RoomStatusEnum } from "db/enums/room-status";
import { In } from "typeorm";
import { userService } from "services/user";
import { User } from "db/models/user";
import { TeamsEnum } from "db/enums/teams";

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
      where: { members: { id: userId }, status: RoomStatusEnum.ENDED},
      relations: ['owner', 'judje', 'proTeam', 'conTeam', 'winners', 'members']
    });
  }

  public async createRoom(ownerId: number, room: CreateRoomPayload): Promise<Room> {
    const codeLength = 12;
    const codeCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const owner = await userService.getUserById(ownerId);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const generatedCode = await this.generateUniqueCode(codeLength, codeCharset);

    const roomPayload = {...room, owner, members: [owner], code: generatedCode};

    const newRoom = this.roomRepository.create(roomPayload);

    return this.roomRepository.save(newRoom);
  }

  public async getRoomById(id: number): Promise<Room> {
    if (!id) {
      throw new Error("RoomId is required");
    }

    const room = await this.roomRepository.findOne({
      where: {id},
      relations: ['owner', 'judje', 'proTeam', 'conTeam', 'winners', 'members']
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
      relations: ['owner', 'judje', 'proTeam', 'conTeam', 'winners', 'members']
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

    const usersWithRoles = room.proTeam.concat(room.conTeam, room.judje || []);;

    if (!usersWithRoles.length || !room.members.every(member => usersWithRoles.some(user => user.id === member.id))) {
      throw new Error("Not all members have a role");
    }

    if (!room.judje){
      room.practise = true;
    }

    room.status = RoomStatusEnum.STARTED;
    return await this.roomRepository.save(room);
  }

  public async joinRoom(userId: number, roomCode: string): Promise<Room> {
    if (!userId) {
      throw new Error("UserId is required");
    }

    if (!roomCode) {
      throw new Error("RoomCode is required");
    }

    const room = await this.getRoomByCode(roomCode);
    const user = await userService.getUserById(userId) as User;

    room.members.push(user);
    return await this.roomRepository.save(room);
  }

  public async setJudje(ownerId: number, userId: number, roomId: number): Promise<Room> {
    if (!userId || !ownerId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;
    const owner = await userService.getUserById(ownerId) as User;

    if (room.owner.id !== owner.id){
      throw new Error("You are not owner");
    }

    if (!room.members.some(member => member.id === user.id)){
      throw new Error("User is not a room member");
    }

    room.judje = user;
    return await this.roomRepository.save(room);
  }

  public async setOwnTeam(userId: number, roomId: number, team: TeamsEnum): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (!room.members.some(member => member.id === user.id)){
      throw new Error("User is not a room member");
    }

    room.proTeam = room.proTeam.filter(member => member.id !== user.id);
    room.conTeam = room.conTeam.filter(member => member.id !== user.id);

    if (team === TeamsEnum.CON_TEAM){
      room.conTeam.push(user);
    }else if (team === TeamsEnum.PRO_TEAM){
      room.proTeam.push(user);
    }

    return await this.roomRepository.save(room);
  }

  public async setUserTeam(ownerId: number, userId: number, roomId: number, team: TeamsEnum): Promise<Room> {
    if (!userId || !ownerId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;
    const owner = await userService.getUserById(ownerId) as User;

    if (room.owner.id !== owner.id){
      throw new Error("You are not owner");
    }

    if (!room.members.some(member => member.id === user.id)){
      throw new Error("User is not a room member");
    }

    room.proTeam = room.proTeam.filter(member => member.id !== user.id);
    room.conTeam = room.conTeam.filter(member => member.id !== user.id);

    if (team === TeamsEnum.CON_TEAM){
      room.conTeam.push(user);
    }else if (team === TeamsEnum.PRO_TEAM){
      room.proTeam.push(user);
    }

    return await this.roomRepository.save(room);
  }

  public async endRoom(userId: number, roomId: number, winnerTeam: TeamsEnum): Promise<Room> {
    if (!userId || !roomId || !winnerTeam) {
      throw new Error("UserId, RoomId and Team are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (room.owner.id !== user.id && room.judje?.id !== user.id) {
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
}

export const roomService = new RoomService();
