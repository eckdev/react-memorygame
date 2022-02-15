import { io } from "socket.io-client";

class SocketService {
  connect(url) {
    return new Promise((rs, rj) => {
      this.socket = io(url);

      if (!this.socket) return rj();

      this.socket.on("connect", () => {
        console.log('connect')
        rs(this.socket);
      });

      this.socket.on("connect_error", (err) => {
        console.log("Connection error: ", err);
        rj(err);
      });
    });
  }
}

export default new SocketService();
