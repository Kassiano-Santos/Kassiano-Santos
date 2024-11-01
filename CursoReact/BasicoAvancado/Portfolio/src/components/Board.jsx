import Card from "./Card.jsx";
import "./Game.css";

const Board = ({ cards, onCardClick }) => {
  return (
    <div className= "board">
      {cards.map((card) => (
        <Card key= {card.id} card= {card} onCardClick = {onCardClick}/>
      ))}
    </div>
  );
};
export default Board;