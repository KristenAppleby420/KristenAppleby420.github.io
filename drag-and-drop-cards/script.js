const deckArea = document.getElementById('deckArea');
const discardPile = document.getElementById('discardPile');
const dealButton = document.getElementById('dealButton');

// Deck of cards
const deck = [
    // Clubs
    '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', '5_of_clubs.png', 
    '6_of_clubs.png', '7_of_clubs.png', '8_of_clubs.png', '9_of_clubs.png', 
    '10_of_clubs.png', 'jack_of_clubs.png', 'queen_of_clubs.png', 'king_of_clubs.png', 
    'ace_of_clubs.png',

    // Diamonds
    '2_of_diamonds.png', '3_of_diamonds.png', '4_of_diamonds.png', '5_of_diamonds.png', 
    '6_of_diamonds.png', '7_of_diamonds.png', '8_of_diamonds.png', '9_of_diamonds.png', 
    '10_of_diamonds.png', 'jack_of_diamonds.png', 'queen_of_diamonds.png', 'king_of_diamonds.png', 
    'ace_of_diamonds.png',

    // Hearts
    '2_of_hearts.png', '3_of_hearts.png', '4_of_hearts.png', '5_of_hearts.png', 
    '6_of_hearts.png', '7_of_hearts.png', '8_of_hearts.png', '9_of_hearts.png', 
    '10_of_hearts.png', 'jack_of_hearts.png', 'queen_of_hearts.png', 'king_of_hearts.png', 
    'ace_of_hearts.png',

    // Spades
    '2_of_spades.png', '3_of_spades.png', '4_of_spades.png', '5_of_spades.png', 
    '6_of_spades.png', '7_of_spades.png', '8_of_spades.png', '9_of_spades.png', 
    '10_of_spades.png', 'jack_of_spades.png', 'queen_of_spades.png', 'king_of_spades.png', 
    'ace_of_spades.png'
];

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards
    }
}

// Function to create a card element
function createCardElement(card) {
    const cardElement = document.createElement('img');
    cardElement.src = `cards/${card}`; // Adjust path to match your folder structure
    cardElement.className = 'card';
    cardElement.draggable = true;

    // Add dragstart event listener
    cardElement.addEventListener('dragstart', handleDragStart);

    return cardElement;
}

// Deal cards on button click
dealButton.addEventListener('click', () => {
    deckArea.innerHTML = ''; // Clear the deck area
    shuffleDeck(deck); // Shuffle the deck

    // Add the first 10 cards to the deck area
    deck.slice(0, 10).forEach(card => {
        const cardElement = createCardElement(card);
        deckArea.appendChild(cardElement);
    });
});

// Handle dragstart event
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.src); // Store the card's source
}

// Allow dropping on the discard pile
discardPile.addEventListener('dragover', (e) => {
    e.preventDefault(); // Prevent default behavior to allow dropping
});

// Handle drop event on the discard pile
discardPile.addEventListener('drop', (e) => {
    e.preventDefault();

    // Get the card source from the drag event
    const cardSrc = e.dataTransfer.getData('text/plain');

    // Find the corresponding card element
    const card = document.querySelector(`img[src="${cardSrc}"]`);

    if (card) {
        card.remove(); // Remove the card from the deck area
        alert('Card discarded!');
    }
});
