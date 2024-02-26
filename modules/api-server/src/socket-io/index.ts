import { Server, Socket } from 'socket.io';
import { roomService } from 'services/room';
import { User } from 'db/models/user';
import { RoomStatusEnum } from 'db/enums/room-status';
import { TeamsEnum } from 'db/enums/teams';

interface HandshakeQuery {
  userId: number;
  roomId: number;
}

export function setupSocketEvents(io: Server): void {
  io.on('connection', async (socket: Socket) => {
    try {
      const { userId, roomId } = socket.handshake.query as unknown as HandshakeQuery;

      if (!userId || !roomId) {
        socket.emit('error', { message: 'userId and roomId are required for connection' });
        socket.disconnect();
        return;
      }

      const room = await roomService.getRoomById(roomId);
      const isAdmin = userId == room.owner.id;
      let currentTeamType: 'proTeam' | 'conTeam' = 'proTeam';

      // initial setup
      io.to(`room-${room.id}`).emit('online-members', room.members);
      io.to(`room-${room.id}`).emit('status', room.status);
      socket.emit('is-admin', isAdmin);
      const teamMembers = room[currentTeamType as keyof typeof room] as User[];
      const isTeamMember = teamMembers.some((member) => member.id == userId);
      io.to(`room-${room.id}`).emit('current-team', { currentTeamType, teamMembers, isTeamMember });

      let countdownIterations = room.reportsNumber*2;
      let reportInterval: NodeJS.Timeout | undefined;
      let totalInterval: NodeJS.Timeout | undefined;

      function startReportTimer() {
        let reportTime = room.reportTime * 60;

        if (countdownIterations > 0) {
          reportInterval = setInterval(async () => {
            const updatedRoom = await roomService.getRoomById(room.id);

            if (updatedRoom.status === RoomStatusEnum.ENDED) {
              clearInterval(reportInterval);
            } else if (updatedRoom.status !== RoomStatusEnum.PAUSED) {
              reportTime--;
              io.to(`room-${room.id}`).emit('countdown-report', reportTime);

              if (reportTime === 0) {
                clearInterval(reportInterval);
                countdownIterations--;
                currentTeamType = currentTeamType === 'proTeam' ? 'conTeam' : 'proTeam';
                const teamMembers = room[currentTeamType as keyof typeof room] as User[];
                const isTeamMember = teamMembers.some((member) => member.id == userId);
                io.to(`room-${room.id}`).emit('current-team', { currentTeamType, teamMembers, isTeamMember });
                startReportTimer();
              }
            }
          }, 1000);
        } else {
          startGradingTimer();
          countdownIterations = room.reportsNumber*2;
        }
      }

      function startTotalTimer() {
        let totalTime = room.reportTime * countdownIterations * 60;

        if (countdownIterations > 0) {
          totalInterval = setInterval(async () => {
            const updatedRoom = await roomService.getRoomById(room.id);
            if (updatedRoom.status === RoomStatusEnum.ENDED) {
              clearInterval(totalInterval);
            } if (updatedRoom.status !== RoomStatusEnum.PAUSED) {
              totalTime--;
              io.to(`room-${room.id}`).emit('countdown-total', totalTime);

              if (totalTime === 0) {
                clearInterval(totalInterval);
              }
            }
          }, 1000);
        }
      }

      async function startGradingTimer() {
        let gradingTime = 60;
        await roomService.setStatus(roomId, RoomStatusEnum.GRADING);
        io.to(`room-${roomId}`).emit('status', RoomStatusEnum.GRADING);

        const gradingInterval = setInterval(async () => {
          const updatedRoom = await roomService.getRoomById(room.id);
          if (updatedRoom.status === RoomStatusEnum.ENDED) {
            clearInterval(gradingInterval);
          } else if (updatedRoom.status !== RoomStatusEnum.PAUSED) {
            gradingTime--;
            io.to(`room-${room.id}`).emit('countdown-grading', gradingTime);

            if (gradingTime === 0) {
              clearInterval(gradingInterval);
              await roomService.setStatus(roomId, RoomStatusEnum.ENDED);
              io.to(`room-${roomId}`).emit('status', RoomStatusEnum.ENDED);
            }
          }
        }, 1000);
      }

      socket.on("current-team", () => {
        const teamMembers = room[currentTeamType as keyof typeof room] as User[];
        const isTeamMember = teamMembers.some((member) => member.id == userId);

        io.to(`room-${room.id}`).emit('current-team', { currentTeamType, teamMembers, isTeamMember });
      })

      socket.on('join', async () => {
        try {
          const room = await roomService.joinRoomById(userId, roomId);
          const totalTime = room.reportTime * room.reportsNumber * 2 * 60;
          const reportTime = room.reportTime * 60;

          socket.join(`room-${roomId}`);
          io.to(`room-${roomId}`).emit('online-members', room.members);
          io.to(`room-${roomId}`).emit('status', room.status);
          io.to(`room-${roomId}`).emit('countdown-report', reportTime);
          io.to(`room-${roomId}`).emit('countdown-total', totalTime);
          io.to(`room-${roomId}`).emit('countdown-grading', 60);
          io.to(`room-${room.id}`).emit('online-members', room.members);
          io.to(`room-${room.id}`).emit('status', room.status);
          socket.emit('is-admin', isAdmin);
          const teamMembers = room[currentTeamType as keyof typeof room] as User[];
          const isTeamMember = teamMembers.some((member) => member.id == userId);
          io.to(`room-${room.id}`).emit('current-team', { currentTeamType, teamMembers, isTeamMember });
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('end', async () => {
        try {
          const room = await roomService.endRoom(userId, roomId);
          io.to(`room-${roomId}`).emit('status', room.status);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('pause', async () => {
        try {
          const room = await roomService.pauseRoom(userId, roomId);
          io.to(`room-${roomId}`).emit('status', room.status);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('resume', async () => {
        try {
          const room = await roomService.resumeRoom(userId, roomId);
          io.to(`room-${roomId}`).emit('status', room.status);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('start', async () => {
        try {
          const room = await roomService.startRoom(userId, roomId);
          const teamMembers = room[currentTeamType as keyof typeof room] as User[];
          const isTeamMember = teamMembers.some((member) => member.id == userId);

          io.to(`room-${room.id}`).emit('status', room.status);
          io.to(`room-${room.id}`).emit('current-team', { currentTeamType, teamMembers, isTeamMember });
          startReportTimer();
          startTotalTimer();
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('rate', async (team: TeamsEnum) => {
        try {
          const room = await roomService.gradeRoom(userId, roomId, team);
          io.to(`room-${room.id}`).emit('status', room.status);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('skip', async () => {
        try {
          const teamMembers = room[currentTeamType as keyof typeof room] as User[];
          const isTeamMember = teamMembers.some((member) => member.id == userId);

          if (isTeamMember || room.owner.id == userId) {
            countdownIterations--;
            currentTeamType = currentTeamType === 'proTeam' ? 'conTeam' : 'proTeam';
  
            const teamMembers = room[currentTeamType as keyof typeof room] as User[];
            const isTeamMember = teamMembers.some((member) => member.id == userId);
            io.to(`room-${room.id}`).emit('current-team', { currentTeamType, teamMembers, isTeamMember });
  
            clearInterval(reportInterval);
            clearInterval(totalInterval);
            startTotalTimer();
            startReportTimer();
          }else{
            socket.emit('error', { message: `User isn't a team member or owner` });
          }
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('disconnect', async () => {
        try {
          if (userId && roomId) {
            const room = await roomService.leaveRoom(userId, roomId);
            io.to(`room-${roomId}`).emit('online-members', room.members);
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
}
