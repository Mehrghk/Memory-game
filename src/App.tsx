import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";
export interface Card {
  id: number;
  src: string;
  matched : boolean
}
function App() {
  const cardImages1 = [
    { src: "blob/main/src/assets/photos/Rabbit.png", matched: false },
    { src: "blob/main/src/assets/photos/RabbitStars.png", matched: false },
    { src: "blob/main/src/assets/photos/CatZeroPercent.png", matched: false },
    { src: "blob/main/src/assets/photos/Mouse.jpg", matched: false },
    { src: "blob/main/src/assets/photos/OmnomSpider.png", matched: false },
    { src: "blob/main/src/assets/photos/SleepyCat.png", matched: false },
  ];
  const cardImages2 = [
    { src: "blob/main/src/assets/3/Untitled-1.jpg", matched: false },
    { src: "blob/main/src/assets/3/Untitled-2.jpg", matched: false },
    { src: "blob/main/src/assets/3/Untitled-3.jpg", matched: false },
    { src: "blob/main/src/assets/3/Untitled-4.jpg", matched: false },
    { src: "blob/main/src/assets/3/Untitled-5.jpg", matched: false },
    { src: "blob/main/src/assets/3/Untitled-6.jpg", matched: false },
  ];
  const cardImages3  = [
    { src: "blob/main/src/assets/1/Untitled-1.jpg", matched: false },
    { src: "blob/main/src/assets/1/Untitled-2.jpg", matched: false },
    { src: "blob/main/src/assets/1/Untitled-3.jpg", matched: false },
    { src: "blob/main/src/assets/1/Untitled-4.jpg", matched: false },
    { src: "blob/main/src/assets/1/Untitled-5.jpg", matched: false },
    { src: "blob/main/src/assets/1/Untitled-6.jpg", matched: false },
  ];
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  const ShuffleCard = () => {
    const packs = [cardImages1,cardImages2,cardImages3];
    const d = Math.trunc(Math.random()*3);
    
    const shuffledCards = [...packs[d], ...packs[d]]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    //inja math.random ye addad az sefr ta 1 be ma  mide va darim behesh migim agar addad manfi shod jashoon ro avaz nakon vali agar mosbat shod avaz kon
    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleCoice = (card: Card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    console.log(firstChoice)
    console.log(secondChoice)
  };

  //compare 2 Selected Cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards(prevCards =>{
          return prevCards.map(card =>{
            if(card.src === firstChoice.src){
              return {...card, matched:true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(()=>resetTurn(),1000);
      }
      
    }
  }, [firstChoice, secondChoice]);

  //reset choices and increase turn
  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  };
  //for cards to apear at first reload
  useEffect(()=>{
    ShuffleCard();
  },[])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={ShuffleCard}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleCoice={handleCoice}
              flipped={card===firstChoice || card===secondChoice || card.matched}
              disabled = {disabled}
              />
          ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
