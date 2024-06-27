import { useState } from 'react';
import { generateKey } from './Utils';

function Form ( { handleAddCards }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCardObject = {
            id: generateKey(),
            question: question,
            answer: answer
        }

        fetch('http://localhost:3001/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCardObject)
        })
        .then(response => response.json())
        .then(data => handleAddCards([data]))

    }

    return (
        <div className='form' onSubmit={handleSubmit}>
            <form>
                <input
                placeholder='Enter Question'
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                />
                <input
                placeholder='Enter Answer'
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                />
                <input type='submit' value='Add Flashcard' />
            </form>
        </div>
    )
}

export default Form;