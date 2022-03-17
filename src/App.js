import React, { useEffect,useState } from 'react'
import socketService from './services/socketService';
import { JoinRoom } from "./contents/JoinRoom";
import  Game  from "./contents/Game";
import { GameContext } from './GameContext';

const App = () => {
  const [isInRoom, setIsInRoom] = useState(false);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
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

  const gameContextValue = {
    isInRoom: isInRoom,
    setInRoom: setIsInRoom,
    isPlayerTurn: isPlayerTurn,
    setPlayerTurn: setPlayerTurn,
    isGameStarted: isGameStarted,
    setGameStarted: setGameStarted
  }

  return (
    <GameContext.Provider value={gameContextValue}>      
        {!isInRoom && <JoinRoom></JoinRoom>}
        {isInRoom && <Game />}
    </GameContext.Provider>

  )
}

export default App