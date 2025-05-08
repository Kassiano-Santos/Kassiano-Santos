import React from 'react';
import { useState } from "react";
import Board from './Board';
import "./Game.css";
import { Container } from '@mui/material';

 //Método para embaralhar o baralho
 const shuffleArray= (array)=> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateCards= ()=> {
  const values = ["A","B","C","D","E","F","G","H"];

  const cards = values.map((value)=> ({
    value,
    //isFlipped verifica se o card está virado
    isFlipped: false,
  }));

  const duplicateCards = cards
  .concat([...cards])
  .map((card, index) => ({...card, id: index }));

  return shuffleArray(duplicateCards);
};

const Game = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [chances, setChances] = useState(20);

  const result = cards.filter((card) => card.isFlipped).length;

  const handleCardClick = (clickedCard) => {
    if (chances === 0) return;

    if (flippedCards.length === 2) return;

    const newCards = cards.map((card)=>{
      return card.id === clickedCard.id ? {...card, isFlipped: true} : card;
    });

    setCards(newCards);
    setFlippedCards([...flippedCards, clickedCard]);

    if(flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards;
        
        if (firstCard.value !== clickedCard.value) {
          const resetCards = cards.map((card)=> {
            return card.id === firstCard.id || card.id === clickedCard.id
            ? { ...card, isFlipped: false }
            : card;
          }); 

          setCards(resetCards);
          setChances((prev) => prev - 1);
        };
        setFlippedCards([]);
      }, 600);
    }
  };

  const resetGame = ()=> {
    setChances(20);
    setFlippedCards([]);
    setCards(generateCards());
  };

  return (
    <Container maxWidth={false} sx={{height: "100%", backgroundColor: "#0a192f", position: "fixed"}}>
    <div className = "conteiner">
      <div className = "game">
        <h2 className="title">MEMORY GAME</h2>
        <Board cards= {cards} onCardClick= {handleCardClick}/>
        {chances === 0 ? (
          <p className="text">Your attempts are over</p> 
        ) : result === cards.length ? (
          <h2 className="text">Congratulations, you won !!!</h2>
        ) : ( 
          <p className="text">You have {chances} attempt(s)</p>
        )}
        <button className= "btn" onClick= {resetGame}>Reset Game</button>
      </div>
    </div>
    </Container>
  );
};
export default Game;