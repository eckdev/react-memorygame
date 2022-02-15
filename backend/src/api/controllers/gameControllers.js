import {
    ConnectedSocket,
    MessageBody,
    OnMessage,
    SocketController,
    SocketIO,
  } from "socket-controllers";

  @SocketController
  export class GameController {
    getSocketGameRoom(socket){
        const socketRooms = Array.from(socket.rooms.values()).filter(
            (r) => r !== socket.id
          );
          const gameRoom = socketRooms && socketRooms[0];
      
          return gameRoom;
    }

    @OnMessage("update_game")
    async updateGame(
        @SocketIO() io,
        @ConnectedSocket() socket,
        @MessageBody() message
    ){
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit("on_game_update", message);
    }

    @OnMessage("game_win")
    async gameWin(
        @SocketIO() io,
        @ConnectedSocket() socket,
        @MessageBody() message
    ) {
      const gameRoom = this.getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_game_win", message);
    }
  }