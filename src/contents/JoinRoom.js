import React, { useContext, useState } from "react";
import { GameContext } from "../GameContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";

export const JoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(GameContext);

  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e) => {
    e.preventDefault();
debugger;
    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

      console.log('JOİNED',joined)
    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <>
      <h4>Enter Room ID to Join the Game</h4>
      <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full" value={roomName} onChange={handleRoomNameChange} />
      <button onClick={joinRoom}>Join</button>
    </>
  );
};
