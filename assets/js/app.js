const gameModule = (() => {
  'use strict'

  let deck = [];
  const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

  // Referencias del HTML
  const btnRequest = document.querySelector('#btnRequest'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew'),
        playersPointsHTML = document.querySelectorAll('small'),
        divPlayersCards = document.querySelectorAll('.divCards');

  btnRequest.disabled = true;
  btnStop.disabled = true;

  // Puntos
  let playersPoints = [];
  
  // Esta función inicializa el juego
  const initializeGame = ( numPlayers = 2 ) => {
    deck = createDeck();
    playersPoints = [];
    for ( let i = 0; i < numPlayers; i++ ) {
      playersPoints.push(0);
      playersPointsHTML[i].innerText = 0;
      divPlayersCards[i].innerHTML = '';
    }
    // playersPointsHTML.forEach( element => element.innerText = 0 );
    // divPlayersCards.forEach( element => element.innerHTML = '' );
    btnRequest.disabled = false;
    btnStop.disabled = false;
  }

  // Función que crea el deck
  const createDeck = () => {
    deck = [];
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
    return _.shuffle( deck );
  }

  // Función que regresa una carta
  const requestCard = () => {
    if ( deck.length === 0 ) {
      throw 'No hay cartas en el deck';
    }
    return deck.pop();
  }

  // Pedir carta
  const cardValue = ( card ) => {
    const value = card.substring(0, card.length - 1);
    return ( isNaN( value ) ) ?
      ( value === 'A' ) ? 11 : 10 
    : ( value * 1)
  }

  // Turno: 0 jugador 1, 1 jugador 2... último computadora
  const accumulatePoints = ( card, turn ) => {
    playersPoints[turn] = playersPoints[turn] + cardValue( card );
    playersPointsHTML[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  }

  const createCard = ( card, turn ) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${ card }.png`;
    imgCard.classList.add('carta');
    divPlayersCards[turn].append( imgCard );
  }

  const determinateWinner = () => {
    const [ minPoints, machinePoints ] = playersPoints;

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
    }, 300)
  }

  // Turno computadora
  const machineTurn = ( minPoints ) => {
    let machinePoints = 0;
    do {
      const card = requestCard();
      machinePoints = accumulatePoints( card, playersPoints.length - 1 );
      createCard( card, playersPoints.length - 1 )
    } while ( (machinePoints < minPoints ) && (minPoints <= 21 ) );
    determinateWinner();
  }

  // Eventos
  btnRequest.addEventListener('click', () => {
    const card = requestCard();
    const playerPoints = accumulatePoints( card, 0 );
    createCard( card, 0);
    if ( playerPoints > 21 ) {
      btnRequest.disabled = true;
      btnStop.disabled = true;
      machineTurn( playerPoints );
    } else if ( playerPoints === 21 ) {
      btnRequest.disabled = true;
      btnStop.disabled = true;
      machineTurn( playerPoints );
    }
  });

  btnStop.addEventListener('click', () => {
    btnRequest.disabled = true;
    btnStop.disabled = true;
    machineTurn( playersPoints[0] );
  });

  btnNew.addEventListener('click', () => {
    initializeGame()
  });

  return {
    newGame: initializeGame
  }

})();