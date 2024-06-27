import { useState } from 'react';

export default function Card ({ card, handleDeleteCard }) {
    const [flipCard, setFlipCard] = useState(true);

    const handleDelete = (cardId) => {
        fetch(`http://localhost:3001/questions/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        handleDeleteCard(cardId);
    }

    var className = "flash-card ";
    className += flipCard ? "question" : "answer";

    return (
        <div className={className}>
            <div className="card-body" onClick={() => setFlipCard(!flipCard)}>
                {flipCard ? card.question : card.answer}
            </div>
            <span className='delete-button' onClick={() => handleDelete(card.id)}>&times;</span>
        </div>
    );
}

