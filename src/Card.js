import { useState } from 'react';

function Card ({ card, handleDeleteCard }) {
    const [flipCard, setFlipCard] = useState(false);

    const handleDelete = (cardId) => {
        handleDeleteCard(cardId);
        fetch(`http://localhost:3001/questions/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="flash-card">
            <div className="card-body" onClick={() => setFlipCard(!flipCard)}>
                {flipCard ? card.answer : card.question}
            </div>
            <span className='delete-button' onClick={() => handleDelete(card.id)}>&times;</span>
        </div>
    );
}

export default Card;
