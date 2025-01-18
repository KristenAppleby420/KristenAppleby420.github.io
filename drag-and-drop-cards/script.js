const deckArea = document.getElementById('deckArea');
const discardPile = document.getElementById('discardPile');
const dealButton = document.getElementById('dealButton');
const drawButton = document.getElementById('drawButton');
const noDrawButton = document.getElementById('noDrawButton');

let deck = [];

const fullDeck = [
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

// Shuffle function
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log('Deck shuffled:', deck);
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
        console.log(`Dragging card: ${cardElement.src}`);
    });

    return cardElement;
}

dealButton.addEventListener('click', () => {
    console.log('Deal Cards button clicked'); // Debugging log

    // Clear the deck area
    deckArea.innerHTML = '';
    console.log('Cleared deck area');

    // Reset and shuffle the deck
    deck = [...fullDeck];
    shuffleDeck(deck);
    console.log('Shuffled deck:', deck);

    // Deal the first 10 cards
    deck.slice(0, 10).forEach(card => {
        const cardElement = createCardElement(card);
        console.log('Dealing card:', card); // Debugging
        deckArea.appendChild(cardElement);
    });

    // Remove dealt cards from the deck
    deck = deck.slice(10);
    console.log('Remaining deck after dealing:', deck);

    // Enable the draw/no-draw buttons
    drawButton.disabled = false;
    noDrawButton.disabled = false;
});

// Draw another card
drawButton.addEventListener('click', () => {
    if (deck.length > 0) {
        const card = deck.shift(); // Take the next card
        const cardElement = createCardElement(card);
        deckArea.appendChild(cardElement);
        console.log('Drew card:', card);
    } else {
        alert('No more cards in the deck!');
        drawButton.disabled = true;
    }
});

// Decline to draw
noDrawButton.addEventListener('click', () => {
    alert('You chose not to draw another card.');
    drawButton.disabled = true;
    noDrawButton.disabled = true;
});

// Discard pile drag-and-drop
discardPile.addEventListener('dragover', (e) => {
    e.preventDefault();
});

discardPile.addEventListener('drop', (e) => {
    e.preventDefault();
    const cardSrc = e.dataTransfer.getData('text/plain');
    const cardFileName = cardSrc.split('/').pop();
    const card = Array.from(deckArea.querySelectorAll('img')).find(
        img => img.src.includes(cardFileName)
    );

    if (card) {
        card.remove();
        alert('Card discarded!');
    } else {
        console.error('Card not found in the deck area:', cardFileName);
    }
});
