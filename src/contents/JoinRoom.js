import React, { useContext, useState } from "react";
import { Button } from "../components/Button";
import { GameContext } from "../GameContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";

export const JoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom } = useContext(GameContext);

  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e) => {
    e.preventDefault();
    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    console.log("JOİNED", joined);
    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-50 p-8 w-[32rem] rounded-2xl">
        <h2 className="font-bold text-3xl mt-2 mb-8">Join Room</h2>
        <input className="w-full p-2 mb-8 rounded-md" autoComplete="off"
                    placeholder="Enter room ID" type="text" name="joinRoomInput" value={roomName} onChange={handleRoomNameChange} />
        <Button
            text={"Join"}
            color={"bg-amber-400"}
            hoverColor={"bg-amber-500"}
            clickEvent={joinRoom}
            additionalClass={"w-full"}
          ></Button>
      </div>
    </div>
  );
};
