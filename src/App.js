import { useState, useEffect } from "react";

import CardList from "./CardList";
import Form from "./Form";

function shuffle(array) {
  // An implementation of the Fisher-Yates shuffle algorithm
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/questions')
    .then(response => response.json())
    .then(data => setCards(data))
  }, []);

  const handleAddCard = (newCard) => setCards(currentCardList => {
    return [...currentCardList, newCard]
  })

  const handleDeleteCard = (cardId) => setCards(currentCardList => {
    return currentCardList.filter(card => card.id !== cardId)
  })

  const handleShuffleCards = () => setCards(currentCardList => {
    let shuffledCards = shuffle([...currentCardList])
    return shuffledCards
  })

  return (
    <div className="App">
      <div>
        <input class='shuffle' type='button' value='Shuffle' onClick={ handleShuffleCards }/>
      </div>
      <div>
        <Form handleAddCard={ handleAddCard }/>
      </div>
      <div>
        <CardList cards={ cards } handleDeleteCard={ handleDeleteCard }/>
      </div>
    </div>

  );
}

export default App;
