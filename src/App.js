import { useState, useEffect } from "react";

import CardList from "./CardList";
import Form from "./Form";
import Modal from "./Modal";
import SelectCSVForm from "./Csv";

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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/questions')
    .then(response => response.json())
    .then(data => setCards(data))
  }, []);

  const handleAddCards = (newCards) => setCards(currentCardList => {
    return [...currentCardList, ...newCards]
  })

  const handleDeleteCard = (cardId) => setCards(currentCardList => {
    return currentCardList.filter(card => card.id !== cardId)
  })

  const handleShuffleCards = () => setCards(currentCardList => {
    let shuffledCards = shuffle([...currentCardList])
    return shuffledCards
  })

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="App">
      <div className="controls">
        <input className='shuffle' type='button' value='Shuffle' onClick={ handleShuffleCards }/>
        <Form handleAddCards={ handleAddCards }/>
          <button onClick={ openModal }>Import CSV</button>
      </div>
      <div>
        <CardList cards={ cards } handleDeleteCard={ handleDeleteCard }/>
      </div>
      <Modal isOpen={ modalOpen } onClose={ closeModal }>
        <SelectCSVForm handleAddCards={ handleAddCards } closeModal={ closeModal }/>
      </Modal>
    </div>

  );
}

export default App;
