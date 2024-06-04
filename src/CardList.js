import Card from "./Card";

function CardList ({ cards, handleDeleteCard }) {

    const displayCards = cards.map(card => <Card card={ card } key={ card.id } handleDeleteCard ={ handleDeleteCard } />);
    return (
        <div className="grid-container">
            { displayCards }
        </div>
    );
}

export default CardList;