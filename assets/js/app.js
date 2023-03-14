let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

// Referencias del HTML
const btnRequest = document.querySelector('#btnRequest');
const btnStop = document.querySelector('#btnStop');
const playersPointsHTML = document.querySelectorAll('small');
const playerCardsHTML = document.querySelector('#jugador-cartas');
const machineCardsHTML = document.querySelector('#computadora-cartas');
const btnNew = document.querySelector('#btnNew');

// Puntos
let playerPoints = 0,
    machinePoints = 0;

// Función que crea el deck
const createDeck = () => {
  for( let i = 2; i <= 10; i++ ) {
    for( let type of types ) {
      deck.push( i + type );
    }
  }
  for( let type of types ) {
    for( let esp of specials ) {
      deck.push( esp + type );
    }
  }
  // console.log( deck );
  deck = _.shuffle( deck );
  console.log( deck );
  return deck;
}
createDeck();

// Función que regresa una carta
const requestCard = () => {
  if ( deck.length === 0 ) {
    throw 'No hay cartas en el deck';
  }
  const card = deck.pop();
  return card;
}

// Pedir carta
const cardValue = ( card ) => {
  const value = card.substring(0, card.length - 1);
  // if operador ternario
  return ( isNaN( value ) ) ?
    ( value === 'A' ) ? 11 : 10 
  : ( value * 1)
  // if standard
  // let value = 0;
  // if ( isNaN( value ) ) {
  //   value = ( value === 'A' ) ? 11 : 10;
  // } else {
  //   value = value * 1;
  // }
}

// Turno computadora
const machineTurn = ( minPoints ) => {
  do {
    const card = requestCard();
    machinePoints = machinePoints + cardValue( card );
    playersPointsHTML[1].innerText = machinePoints;
    // <img class="carta" src="assets/cartas/2C.png" alt="carta">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${ card }.png`;
    imgCard.classList.add('carta');
    machineCardsHTML.append( imgCard );
    if ( minPoints > 21 ) {
      break;
    }
  } while ( (machinePoints < minPoints ) && (minPoints <= 21 ) );
  setTimeout(() => {
      if ( machinePoints === minPoints ) {
      alert('Empate!');
    } else if ( minPoints > 21 ) {
      alert('Computadora Gana!');
    } else if ( machinePoints > 21 ) {
      alert('Jugador 1 Gana!');
    } else if ( minPoints < 21 && machinePoints === 21 ) {
      alert('Computadora Gana!')
    } else if ( minPoints < 21 && machinePoints <= 21 && machinePoints > minPoints) {
      alert('Computadora Gana!');
    }
  }, 500)
}

// Eventos
btnRequest.addEventListener('click', () => {
  const card = requestCard();
  playerPoints = playerPoints + cardValue( card );
  playersPointsHTML[0].innerText = playerPoints;
  // <img class="carta" src="assets/cartas/2C.png" alt="carta">
  const imgCard = document.createElement('img');
  imgCard.src = `assets/cartas/${ card }.png`;
  imgCard.classList.add('carta');
  playerCardsHTML.append( imgCard );
  if ( playerPoints > 21 ) {
    // console.warn('Lo siento, perdiste :(');
    btnRequest.disabled = true;
    btnStop.disabled = true;
    machineTurn( playerPoints );
  } else if ( playerPoints === 21 ) {
    // console.warn('21, genial!');
    btnRequest.disabled = true;
    btnStop.disabled = true;
    machineTurn( playerPoints );
  }
});

btnStop.addEventListener('click', () => {
  btnRequest.disabled = true;
  btnStop.disabled = true;
  machineTurn( playerPoints );
});

btnNew.addEventListener('click', () => {
  btnRequest.disabled = false;
  btnStop.disabled = false;
  deck = [];
  createDeck();
  machinePoints = 0;
  playerPoints = 0;
  playersPointsHTML[0].innerText = playerPoints;
  playersPointsHTML[1].innerText = machinePoints;
  playerCardsHTML.innerHTML = '';
  machineCardsHTML.innerHTML = '';
});
