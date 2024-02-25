import { db } from "connectors/db";
import { Room } from "db/models/room";
import { CreateRoomPayload } from "./types";
import * as randomstring from 'randomstring';
import { RoomStatusEnum } from "db/enums/room-status";
import { In } from "typeorm";
import { userService } from "services/user";
import { User } from "db/models/user";
import { CODE_CHARSET, CODE_LENGTH } from "lib/const";
import { friendService } from "services/friend";
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
        code: generatedCode, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING])
      }
    });

    if (!existingRoom) {
      return generatedCode;
    } else {
      return this.generateUniqueCode(codeLength, codeCharset);
    }
  }

  private async updateRoomStatus(userId: number, roomId: number, newStatus: RoomStatusEnum): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("UserId and RoomId are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (room.owner.id !== user.id) {
      throw new Error("You are not the owner");
    }

    room.status = newStatus;
    return await this.roomRepository.save(room);
  }

  public async getUserEndedRooms(userId: number): Promise<Room[]> {
    if (!userId) {
      throw new Error("UserId is required");
    }

    return this.roomRepository.find({
      where: [
        { proTeam: { id: userId }, status: RoomStatusEnum.ENDED },
        { conTeam: { id: userId }, status: RoomStatusEnum.ENDED },
        { judge: { id: userId }, status: RoomStatusEnum.ENDED },
      ],
      relations: ['owner', 'judge', 'proTeam', 'conTeam', 'winners', 'members']
    });
  }

  public async createRoom(ownerId: number, payload: CreateRoomPayload): Promise<Room> {
    const { judgeId, proTeamIds, conTeamIds } = payload;

    if (!ownerId || !proTeamIds.length || !conTeamIds.length) {
      throw new Error("Ids are required");
    }

    const owner = await userService.getUserById(ownerId);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const friends = await friendService.getFriends(ownerId);

    if (!friends) {
      throw new Error("No friends found");
    }

    const allowedRoomIds = [...friends.map(friend => friend.friend.id), ownerId];

    const roomUsersPool = [judgeId, ...proTeamIds, ...conTeamIds];

    const areAllUsersAllowed = roomUsersPool.every(roomUserId => allowedRoomIds.includes(roomUserId));

    if (!areAllUsersAllowed) {
      throw new Error("Not all users in the room are friends");
    }

    const allowedUsers = [
      ...friends.map(friend => friend.friend),
      owner
    ];

    const judge = allowedUsers.find(user => user.id === judgeId);

    if (!judge) {
      throw new Error("Judge not found");
    }

    const proTeam = allowedUsers.filter(user => proTeamIds.includes(user.id));

    if (!proTeam) {
      throw new Error("ProTeam not found");
    }

    const conTeam = allowedUsers.filter(user => conTeamIds.includes(user.id));

    if (!conTeam) {
      throw new Error("ConTeam not found");
    }

    const generatedCode = await this.generateUniqueCode(CODE_LENGTH, CODE_CHARSET);

    const newRoom = this.roomRepository.create({ ...payload, owner, judge, proTeam, conTeam, code: generatedCode });

    return this.roomRepository.save(newRoom);
  }

  public async checkIsRoomValid(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("UserId and RoomId are required");
    }

    const room = await this.roomRepository.findOne({
      where: [
        { id: roomId, proTeam: { id: userId }, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING]) },
        { id: roomId, conTeam: { id: userId }, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING]) },
        { id: roomId, judge: { id: userId }, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING]) },
      ],
      relations: ['owner', 'judge', 'proTeam', 'conTeam', 'winners', 'members']
    })

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  public async getRoomById(id: number): Promise<Room> {
    if (!id) {
      throw new Error("RoomId is required");
    }

    const room = await this.roomRepository.findOne({
      where: { id },
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
      where: { code, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED]) },
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

    if (room.owner.id != userId) {
      throw new Error("You are not owner");
    }

    if (room.status === RoomStatusEnum.STARTED) {
      throw new Error("Room is already started");
    }

    if (room.status === RoomStatusEnum.ENDED) {
      throw new Error("Room is already ended");
    }

    if (room.status === RoomStatusEnum.PAUSED) {
      throw new Error("Room is paused");
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

    const usersInRoom = room.proTeam.concat(room.conTeam, room.judge);

    if (!usersInRoom.some(userInRoom => userInRoom.id === user.id)) {
      throw new Error("User isn't in room");
    }

    return await this.roomRepository.save(room);
  }

  public async joinRoomById(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    const usersInRoom = room.proTeam.concat(room.conTeam, room.judge);

    if (!usersInRoom.some(userInRoom => userInRoom.id === user.id)) {
      throw new Error("User isn't in room");
    }

    room.members.push(user);
    return await this.roomRepository.save(room);
  }

  public async endRoom(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("UserId and RoomId are required");
    }

    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (room.owner.id != user.id) {
      throw new Error("You are not owner");
    }

    if (room.status === RoomStatusEnum.ENDED) {
      throw new Error("Room is already ended");
    }

    room.status = RoomStatusEnum.ENDED;
    return await this.roomRepository.save(room);
  }

  public async pauseRoom(userId: number, roomId: number): Promise<Room> {
    return await this.updateRoomStatus(userId, roomId, RoomStatusEnum.PAUSED);
  }

  public async resumeRoom(userId: number, roomId: number): Promise<Room> {
    return await this.updateRoomStatus(userId, roomId, RoomStatusEnum.STARTED);
  }

  public async isLive(userId: number): Promise<Room | null> {
    const user = await userService.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const room = await this.roomRepository.findOne({
      where: [
        { proTeam: { id: userId }, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING]) },
        { conTeam: { id: userId }, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING]) },
        { judge: { id: userId }, status: In([RoomStatusEnum.PENDING, RoomStatusEnum.STARTED, RoomStatusEnum.PAUSED, RoomStatusEnum.GRADING]) },
      ],
      relations: ['owner', 'judge', 'proTeam', 'conTeam', 'winners', 'members']
    });

    return room;
  }

  public async leaveRoom(userId: number, roomId: number): Promise<Room> {
    if (!userId || !roomId) {
      throw new Error("Ids are required");
    }
    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (!room.members.some(member => member.id === user.id)) {
      throw new Error("User is not a room member");
    }

    room.members = room.members.filter(member => member.nickname !== user.nickname);
    return await this.roomRepository.save(room);
  }

  public async setWinners(userId: number, roomId: number, team: TeamsEnum): Promise<Room> {
    if (!userId || !roomId || !team) {
      throw new Error("Ids and team are required");
    }
    const room = await this.getRoomById(roomId);
    const user = await userService.getUserById(userId) as User;

    if (room.status !== RoomStatusEnum.GRADING) {
      throw new Error("Room status is not grading");
    }

    if (room.judge.id != user.id) {
      throw new Error("User is not a judge");
    }

    if (team === TeamsEnum.PRO_TEAM) {
      room.winners = room.proTeam;
    } else if (team === TeamsEnum.CON_TEAM) {
      room.winners = room.conTeam;
    }

    room.status = RoomStatusEnum.ENDED;
    room.notGraded = false;

    return await this.roomRepository.save(room);
  }

  public async setStatus(roomId: number, status: RoomStatusEnum): Promise<Room> {
    if (!roomId) {
      throw new Error("RoomId is required");
    }
    const room = await this.getRoomById(roomId);

    room.status = status;

    return await this.roomRepository.save(room);
  }

  public async gradeRoom(userId: number, roomId: number, team: TeamsEnum): Promise<Room> {
    if (!userId || !roomId || !team) {
      throw new Error("Ids and team are required");
    }

    const room = await this.getRoomById(roomId);

    if (room.status !== RoomStatusEnum.GRADING) {
      throw new Error("Room status is not grading");
    }

    if (room.judge.id != userId) {
      throw new Error("User is not a judge");
    }

    room.notGraded = false;
    room.winners = team === TeamsEnum.PRO_TEAM ? room.proTeam : room.conTeam;
    room.status = RoomStatusEnum.ENDED;

    return await this.roomRepository.save(room);
  }
}

export const roomService = new RoomService();
