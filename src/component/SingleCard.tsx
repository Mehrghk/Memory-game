import type { Card } from '../App.tsx';
interface Props {
  card: Card;
  handleCoice: (arg: Card) => void;
  flipped: any;
  disabled: boolean;
}
const SingleCard = ({ card, handleCoice, flipped, disabled }: Props) => {
  const handleClick = () => {
    if (!disabled) {
      handleCoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/Memory-game/assets/photos/cover.jpg"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
