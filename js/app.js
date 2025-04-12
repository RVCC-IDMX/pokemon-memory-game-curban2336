/* eslint-disable linebreak-style */
/**
 * Main Application Logic - Simplified Version
 * This file contains the main functionality for the Pokemon Card Flip App
 */
import { PokemonService } from './pokemon.js';

// DOM Elements
const cardGrid = document.getElementById('card-grid');
const loadingSpinner = document.getElementById('loading-spinner');

// Constants
const CARD_COUNT = 12;

// Application State
let cards = [];

// Debug flag - set to true to simulate slower loading
const DEBUG_SHOW_SPINNER = false;
const LOADING_DELAY = 4000; // 2 seconds delay

//Tracks first and second selected card for processing
let firstSelectedCard = null;
let secondSelectedCard = null;
// Prevents interaction during card processing
let isProcessingPair = false;

//Track progress
let matchedPairsCount = 0;
const totalPairs = 6;

/**
 * Initialize the application
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function | MDN: async function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event | MDN: DOMContentLoaded}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/classList | MDN: classList}
 */
async function initApp() {
  // Show loading spinner
  showLoading();

  // Hide the card grid initially
  cardGrid.classList.add('hidden');

  // Create card elements
  createCardElements();

  // Fetch initial Pokemon data
  await fetchAndAssignPokemon();

  // Set up event listeners
  setupEventListeners();

  // Hide loading spinner and show cards
  hideLoading();
  cardGrid.classList.remove('hidden');
}

/**
 * Create card elements in the grid
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement | MDN: createElement}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML | MDN: innerHTML}
 */
function createCardElements() {
  // Clear existing cards
  cardGrid.innerHTML = '';
  cards = [];

  // Create new cards
  for (let i = 0; i < CARD_COUNT; i++) {
    const card = createCardElement(i);
    cardGrid.appendChild(card);
    cards.push(card);
  }
}

/**
 * Create a single card element
 * @param {number} index - Card index
 * @returns {HTMLElement} Card element
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset | MDN: dataset}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild | MDN: appendChild}
 */
function createCardElement(index) {
  // Create card elements
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = index;

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';

  // Add Pokeball image to front
  const pokeballImg = document.createElement('img');
  pokeballImg.src = '/assets/pokeball.png';
  pokeballImg.alt = 'red and white Pokéball';
  pokeballImg.className = 'pokeball-img';
  cardFront.appendChild(pokeballImg);

  // Assemble card
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

/**
 * Fetch and assign Pokemon to cards
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch | MDN: try...catch}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise | MDN: Promise}
 */
async function fetchAndAssignPokemon() {
  try {
    // Fetch multiple random Pokemon and shuffle the array
    const pokemonList = await PokemonService.fetchMultipleRandomPokemon(6);

    const pokemonPairs = pokemonList.flatMap((card) => (card = [card, card]));

    const shuffledPairs = shuffleArray(pokemonPairs);

    // If debug flag is on, add artificial delay to show the spinner
    if (DEBUG_SHOW_SPINNER) {
      await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
    }

    //assign shuffled pokemon to the cards
    for (let i = 0; i < Math.min(CARD_COUNT, shuffledPairs.length); i++) {
      if (cards[i] && shuffledPairs[i]) {
        assignPokemonToCard(cards[i], shuffledPairs[i]);
      }
    }
  } catch (error) {
    console.error('Error fetching and assigning Pokemon:', error);
    // eslint-disable-next-line no-undef
    showErrorMessage('Failed to load Pokémon. Please try refreshing the page.');
  }
}

/**
 * Shuffles array using Fisher-Yates
 * @param {Array} array - the array to shuffle
 * @returns {Array} the shuffled array
 */
function shuffleArray(array) {
  // Create a copy of the array
  // eslint-disable-next-line no-undef
  const arrayCopy = structuredClone(array);

  // Fisher-Yates algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    // Pick a random element from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements i and j
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

/**
 * Assign a Pokemon to a card
 * @param {HTMLElement} card - Card element
 * @param {Object} pokemon - Pokemon data
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify | MDN: JSON.stringify}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector | MDN: querySelector}
 */
function assignPokemonToCard(card, pokemon) {
  if (!card || !pokemon) {
    return;
  }

  // Store Pokemon data in card dataset
  card.dataset.pokemon = JSON.stringify(pokemon);

  // Get card back element
  const cardBack = card.querySelector('.card-back');

  // Clear existing content
  cardBack.innerHTML = '';

  // Create Pokemon elements
  const pokemonImg = document.createElement('img');
  pokemonImg.src = pokemon.sprite;
  pokemonImg.alt = pokemon.name;
  pokemonImg.className = 'pokemon-img';

  const pokemonName = document.createElement('h2');
  pokemonName.textContent = pokemon.name;
  pokemonName.className = 'pokemon-name';

  const pokemonTypes = document.createElement('div');
  pokemonTypes.className = 'pokemon-types';

  // Add type badges
  pokemon.types.forEach(type => {
    const typeBadge = document.createElement('span');
    typeBadge.textContent = type;
    typeBadge.className = `type-badge ${type}`;
    pokemonTypes.appendChild(typeBadge);
  });

  // Create stats section
  const pokemonStats = document.createElement('div');
  pokemonStats.className = 'pokemon-stats';

  // Add height stat
  const heightStat = document.createElement('div');
  heightStat.className = 'stat';
  heightStat.innerHTML = `<span>Height</span><span class="stat-value">${pokemon.height}m</span>`;

  // Add weight stat
  const weightStat = document.createElement('div');
  weightStat.className = 'stat';
  weightStat.innerHTML = `<span>Weight</span><span class="stat-value">${pokemon.weight}kg</span>`;

  // Add abilities count
  const abilitiesStat = document.createElement('div');
  abilitiesStat.className = 'stat';
  abilitiesStat.innerHTML = '<span>Abilities</span>' +
    `<span class="stat-value">${pokemon.abilities.length}</span>`;

  // Assemble stats
  pokemonStats.appendChild(heightStat);
  pokemonStats.appendChild(weightStat);
  pokemonStats.appendChild(abilitiesStat);

  // Assemble card back
  cardBack.appendChild(pokemonImg);
  cardBack.appendChild(pokemonName);
  cardBack.appendChild(pokemonTypes);
  cardBack.appendChild(pokemonStats);
}

/**
 * Handle card click
 * @param {Event} event - Click event
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event | MDN: Event}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList | MDN: classList}
 */
function handleCardClick(event) {
  // Find the clicked card
  const card = event.target.closest('.card');

  //guard against empty card call
  if (!card) {
    return;
  }

  //properly assign card with correct element
  while (card && !card.classList.contains('card')) {
    card = card.parentElement;
  }

  // eslint-disable-next-line max-len
  if (card.classList.contains('flipped') || card.classList.contains('matched') || isProcessingPair) {
    return;
  }

  // Toggle card flip, assign selected card to variable for checking
  card.classList.toggle('flipped');
  if (firstSelectedCard) {
    secondSelectedCard = card;
  } else if (!firstSelectedCard) {
    firstSelectedCard = card;
  }

  //if both cards are selected, run check for matching pair
  if (firstSelectedCard && secondSelectedCard) {
    isProcessingPair = true;
    checkForMatch();
  }
}

/**
 * Checks selected cards for a match
 */
function checkForMatch() {
  // Get Pokémon data from both cards
  let firstPokemonData, secondPokemonData;

  //parse the data for easy access
  try {
    firstPokemonData = JSON.parse(firstSelectedCard.dataset.pokemon);
    secondPokemonData = JSON.parse(secondSelectedCard.dataset.pokemon);
  } catch (error) {
    console.error('Error parsing Pokémon data:', error);
    resetSelection();
    return;
  }

  // Guard clause if either data is missing
  if (!firstPokemonData || !secondPokemonData) {
    console.error('Missing Pokémon data');
    resetSelection();
    return;
  }

  // Use a constant time comparison with strict equality
  if (firstPokemonData.id === secondPokemonData.id) {
    handleMatch();
  } else {
    handleNonMatch();
  }
}

/**
 * If match, mark them, increment current matched pairs, and reset
 * If all pairs matched, activate game end state
 */
function handleMatch() {
  // Mark cards as matched
  firstSelectedCard.classList.add('matched');
  secondSelectedCard.classList.add('matched');

  // Note pair was matched
  ++matchedPairsCount;

  //if all pairs found, end the game
  if (matchedPairsCount === totalPairs) {
    setTimeout(showGameComplete(), 500);
  }

  resetSelection();
}

/**
 * If not match, flip selected cards back over and reset selection
 */
function handleNonMatch() {
  // Use a promise with setTimeout for better async handling
  return new Promise(resolve => {
    setTimeout(() => {
      // Flip cards back over
      firstSelectedCard.classList.remove('flipped');
      secondSelectedCard.classList.remove('flipped');

      resetSelection();

      resolve();
    }, 1000);
  });
}

/**
 * Reset the selection tracking
 */
function resetSelection() {
  // reset card selections
  firstSelectedCard = null;
  secondSelectedCard = null;
  isProcessingPair = false;
}

/**
 * Add end game screen and option for replay
 */
function showGameComplete() {
  //make HTML element to hold screen
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('completion-message');

  //add content to messageContainer
  messageContainer.innerHTML = messageContainer.innerHTML =
    // eslint-disable-next-line max-len, quotes
    `<h1>Congratulations!</h1><p><br>You found all the Pokémon pairs!<br></p><button id='play-again' type='button'>Play Again</button>`;

  //add messageContainer to the page
  document.querySelector('.container').appendChild(messageContainer);

  //add function to play again button to reset the game
  document.getElementById('play-again').addEventListener('click', () => {
    messageContainer.remove();
    resetGame();
  });
}

/**
 * resets variables and re-initializes the card grid
*/
function resetGame() {
  resetSelection();
  matchedPairsCount = 0;
  initApp();
}

/**
 * Set up event listeners
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener | MDN: addEventListener}
 */
function setupEventListeners() {
  // Card click event
  cardGrid.addEventListener('click', handleCardClick);
}

/**
 * Show loading spinner
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList | MDN: classList}
 */
function showLoading() {
  loadingSpinner.classList.remove('hidden');
}

/**
 * Hide loading spinner
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList | MDN: classList}
 */
function hideLoading() {
  loadingSpinner.classList.add('hidden');
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
