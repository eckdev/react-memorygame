import React from "react";

export const defaultState = {
    isInRoom: false,
    setInRoom: () => {},
    isPlayerTurn: false,
    setPlayerTurn: () => {},
    isGameStarted: false,
    setGameStarted: () => {},
}

export const GameContext =  React.createContext(defaultState);