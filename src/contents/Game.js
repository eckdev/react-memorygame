import { memo, useContext, useEffect, useRef, useState } from "react";
import { Circle } from "../components/Circle/index.js";
import data from "../data.json";
import { GameContext } from "../GameContext.js";
import { shuffleCards } from "../utils/shuffleCards.js";

const Game = () => {
    const { isPlayerTurn,setPlayerTurn,isGameStarted,setGameStarted } = useContext(GameContext);
    const [cards] = useState(
        shuffleCards.bind(null, data.concat(data))
      );
      const [openCards, setOpenCards] = useState([]);
      const [clearedCards, setClearedCards] = useState([]);
      const [moves, setMoves] = useState(0);
      const timeout = useRef(null);
    
      const clickOnCard = (index) => {
        if (openCards.length === 1) {
          setMoves(moves + 1);
          setOpenCards((prev) => [...prev, index]);
        } else {
          clearTimeout(timeout.current);
          setOpenCards([index]);
        }
      };
    
      const evaluate = () => {
        const [first, second] = openCards;
        if (cards[first].item === cards[second].item) {
          setClearedCards((prev) => [...prev, cards[first].item]);
          setOpenCards([]);
          return;
        }
        timeout.current = setTimeout(() => {
          setOpenCards([]);
        }, 500);
      };
    
      const checkIsFlipped = (index) => {
        return openCards.includes(index);
      };
    
      const checkIsInActive = (item) => {
        return clearedCards.includes(item);
      };
    
      useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
          timeout = setTimeout(evaluate, 300);
        }
        return () => {
          clearTimeout(timeout);
        };
      }, [openCards]);
  return (
    <div className="mw-600 mx-auto">
      <div className="flex flex-wrap justify-center">
        {cards.map((card, index) => {
          return (
            <Circle
              key={index}
              index={index}
              isFlipped={checkIsFlipped(index)}
              isInActive={checkIsInActive(card.item)}
              clickEvent={clickOnCard}
              item={card}
            />
          );
        })}
      </div>

      <div className="details-container py-10 pl-1">
        <div className="bg-slate-200 text-slate-900 p-6 rounded-lg">
        <span className="text-2xl font-bold text-slate-500">Moves</span>
        <span className="text-2xl font-bold text-slate-500 float-right">{moves}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Game)