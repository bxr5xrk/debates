import { Server, Socket } from 'socket.io';
import { roomService } from 'services/room';
import { Room } from 'db/models/room';

interface CustomSocket extends Socket {
  roomId?: number;
  userId?: number;
}

export function setupSocketEvents(io: Server): void {
  io.on('connection', (socket: CustomSocket) => {
    console.log(`A user ${socket.id} connected`);

    let iterations = 0;
    let currentTeam = 'proTeam';

    function startPreparationTimer(room: Room) {
      console.log(`Preparation is started ${currentTeam}, ${room.id}`);
      let preparationTime = room.preparationTime * 60;

      const preparationInterval = setInterval(() => {
        preparationTime--;
        io.to(`room-${room.id}`).emit('countdownPreparation', preparationTime);

        if (preparationTime === 0) {
            clearInterval(preparationInterval);
            io.to(`room-${room.id}`).emit('preparationFinished', currentTeam);
            startReportTimer(room);
        }
      }, 1000);
    }

    function startReportTimer(room: Room) {
      console.log(`Report is started ${currentTeam}, ${room.id}`);
      io.to(`room-${room.id}`).emit('reportStarted', currentTeam);
      let reportTime = room.reportTime * 60;

      const reportInterval = setInterval(() => {
        reportTime--;
        io.to(`room-${room.id}`).emit('countdownReport', reportTime);

        if (reportTime === 0) {
            clearInterval(reportInterval);
            io.to(`room-${room.id}`).emit('reportFinished', currentTeam);
            startGradingTimer(room);
        }
      }, 1000);
    }

    function startGradingTimer(room: Room) {
      console.log(`Grading is started ${currentTeam}, ${room.id}`);
      io.to(`room-${room.id}`).emit('gradingStarted', currentTeam);

      let gradingTime = room.gradingTime * 60;

      const gradingInterval = setInterval(() => {
        gradingTime--;
        io.to(`room-${room.id}`).emit('countdownGrading', gradingTime);

        if (gradingTime === 0) {
            clearInterval(gradingInterval);
            io.to(`room-${room.id}`).emit('gradingFinished', currentTeam);

            iterations++;
            currentTeam = currentTeam === 'proTeam' ? 'conTeam' : 'proTeam';

            if (iterations < 2) {
              io.to(`room-${room.id}`).emit('currentTeam', currentTeam);
              startPreparationTimer(room);
            }else{
              io.to(`room-${room.id}`).emit('speechesFinished');
              console.log('Speeches are finished');
              iterations = 0;
            }
        }
      }, 1000);
    }

    socket.on('joinRoom', async (userId, roomCode) => {
      try{
        const room = await roomService.joinRoomByCode(userId, roomCode);
        const roomId = room.id;
        socket.join(`room-${roomId}`);
  
        console.log(`User ${socket.id} joined room ${roomId}`);
        io.to(`room-${roomId}`).emit('members', room.members);
        socket.roomId = roomId;
        socket.userId = userId;
      }catch(e){
        console.log(e);
      }
    });

    socket.on('endRoom', async (userId, roomId, winnerTeam) => {
      try{
        const room = await roomService.endRoom(userId, roomId, winnerTeam);
        io.to(`room-${roomId}`).emit('roomEnded');
        console.log('ended')
      }catch(e){
        console.log(e);
      }
    });

    socket.on('startRoom', async (userId, roomId) => {
      try{
        const room = await roomService.startRoom(userId, roomId);
        io.to(`room-${room.id}`).emit('roomStarted');
        io.to(`room-${room.id}`).emit('currentTeam', currentTeam);
        startPreparationTimer(room);
      }catch(e){
        console.log(e);
      }
    });

    socket.on('disconnect', async () => {
      try {
        const userId = socket.userId;
        const roomId = socket.roomId;

        if (userId && roomId) {
          const room = await roomService.leaveRoom(userId, roomId);
          io.to(`room-${roomId}`).emit('members', room.members);
        }
        
        console.log(`User ${socket.id} disconnected`);
      }catch(e){
        console.log(e);
      }
    });
  });
}
