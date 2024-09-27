import Card from "./Card.jsx";

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