import { useState, useEffect } from "react";

import CardList from "./CardList";
import Form from "./Form";

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


  return (
    <div className="App">
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
