const restartGameButton = document.querySelector('.start-game');
let gameBoard = document.querySelector('.game-board');
let gameCard = document.querySelectorAll('.game-card');
let timer = document.querySelector('.timer');

const cards = [
  {
    name: 'Squirtle',
    img: 'assets/img/cards/squirtle.gif',
    backgroundColor: '#b9edeb',
  },
  {
    name: 'Bulbassauro',
    img: 'assets/img/cards/bulbassauro.gif',
    backgroundColor: '#cee3ac',
  },
  {
    name: 'Charizard',
    img: 'assets/img/cards/charizard.gif',
    backgroundColor: '#fadc9b',
  },
  {
    name: 'Dragonite',
    img: 'assets/img/cards/dragonite.gif',
    backgroundColor: '#c9d9f5',
  },
  {
    name: 'Gengar',
    img: 'assets/img/cards/gengar.gif',
    backgroundColor: '#dec9f5',
  },
  {
    name: 'Eevee',
    img: 'assets/img/cards/eevee.gif',
    backgroundColor: '#fcf0e1',
  },
  {
    name: 'Pikachu',
    img: 'assets/img/cards/pikachu.gif',
    backgroundColor: '#f7fa96',
  },
  {
    name: 'Snorlax',
    img: 'assets/img/cards/snorlax.gif',
    backgroundColor: '#dbdbdb',
  },
];

let firstCard = '';
let secondCard = '';
let cardList = [];
let assertions = 0;

function getCardList() {
  const duplicateCards = [...cards, ...cards];
  const shuffled = duplicateCards.sort(() => Math.random() - 0.5);
  cardList = shuffled;
}

function createCard(name, img, backgroundColor) {
  const currentGameCard = document.createElement('div');
  currentGameCard.className = 'game-card';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-face card-back';
  cardBack.setAttribute('data-id', 'back');

  const cardBackImage = document.createElement('img');
  cardBackImage.src = 'assets/img/pokeball-yellow.png';
  cardBack.appendChild(cardBackImage);

  const cardFront = document.createElement('div');
  cardFront.className = 'card-face card-front';
  cardFront.style.backgroundColor = backgroundColor;
  cardFront.setAttribute('data-id', name);

  const cardFrontImage = document.createElement('img');
  cardFrontImage.src = img;
  cardFront.appendChild(cardFrontImage);

  currentGameCard.appendChild(cardFront);
  currentGameCard.appendChild(cardBack);
  gameBoard.appendChild(currentGameCard);
}

function clearCurrentSelectedCards() {
  firstCard = '';
  secondCard = '';
}

function compareCards() {
  const firstCardName = firstCard.getAttribute('data-id');
  const secondCardName = secondCard.getAttribute('data-id');
  if (firstCardName === secondCardName) {
    firstCard.classList.add('disable-card');
    secondCard.classList.add('disable-card');
    assertions++;
    clearCurrentSelectedCards();
    if (assertions >= cards.length) {
      gameOver();
    }
  } else {
    setTimeout(() => {
      firstCard.parentNode.classList.remove('show-card');
      secondCard.parentNode.classList.remove('show-card');
      clearCurrentSelectedCards();
    }, 1000);
  }
}

function flipCard({ target }) {
  const className = target.parentNode.className;
  const currentCard = className.includes('card-face') ? target.parentNode.parentNode : target.parentNode;
  const frontCard = currentCard.children[0];

  if (frontCard.classList.contains('show-card') || frontCard.classList.contains('disable-card')) {
    return;
  }

  if (firstCard !== '' && secondCard !== '') {
    return;
  }

  if (firstCard === frontCard) {
    return;
  }

  if (firstCard === '') {
    firstCard = frontCard;
    currentCard.classList.add('show-card');
  } else {
    secondCard = frontCard;
    currentCard.classList.add('show-card');
    compareCards();
  }
}

function timerInit() {
  let time = new Date();
  time.setHours(0, 0, 0, 0);
  const updateTimer = () => {
    time.setTime(time.getTime() + 1000);
    timer.innerHTML = time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  this.loop = setInterval(updateTimer, 1000);
}

function timerStop() {
  clearInterval(this.loop);
}

function gameOver() {
  setTimeout(() => {
    timerStop();
    alert(`Parabéns! Você terminou o jogo no seguinte tempo: ${timer.innerHTML}.`);
  }, 500);
}

function startGame() {
  gameBoard.innerHTML = '';
  clearInterval(this.loop);
  timerInit();
  assertions = 0;
  getCardList();
  cardList.forEach((card) => {
    createCard(card.name, card.img, card.backgroundColor);
  });
  gameCard = document.querySelectorAll('.game-card');
  gameCard.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
}

restartGameButton.addEventListener('click', (event) => {
  event.preventDefault();
  const opt = confirm('Tem certeza que deseja iniciar um novo jogo?');
  if (opt) {
    startGame();
  }
});

startGame();
