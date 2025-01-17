const deckArea = document.getElementById('deckArea');
const discardPile = document.getElementById('discardPile');
const dealButton = document.getElementById('dealButton');

const deck = [
    '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', '5_of_clubs.png',
    // Add all cards...
];

// Shuffle function
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Create a card element
function createCardElement(card) {
    const cardElement = document.createElement('img');
    cardElement.src = `cards/${card}`;
    cardElement.className = 'card';
    cardElement.draggable = true;

    // Add dragstart event
    cardElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', cardElement.src);
    });

    return cardElement;
}

// Deal cards
dealButton.addEventListener('click', () => {
    deckArea.innerHTML = ''; // Clear previous cards
    shuffleDeck(deck);

    // Add the first 10 cards to the deck area
    deck.slice(0, 10).forEach(card => {
        const cardElement = createCardElement(card);
        deckArea.appendChild(cardElement);
    });
});

// Handle drag and drop for the discard pile
discardPile.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow drop
});

discardPile.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior
    const cardSrc = e.dataTransfer.getData('text/plain');
    const card = document.querySelector(`img[src="${cardSrc}"]`);
    if (card) {
        card.remove(); // Remove the card from the deck area
        alert('Card discarded!');
    }
});
