interface Props {
  card: object;
  handleCoice: (arg: object) => void;
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
          src="src/assets/photos/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
