import React, { useEffect } from "react";
import socketService from "./services/socketService";
import { io } from "socket.io-client";
import { JoinRoom } from "./contents/JoinRoom";

export const Test = () => {
  const connectSocket = async () => {
    await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return <JoinRoom></JoinRoom>;
};
