'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Selektujem skorove i postavljam skorove na 0
const score0El = document.querySelector('#score--0');
//drugi nacin selektovanja
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//postavljam na 0 skorove
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//funkcija za svicovanje igraca
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rool dugme funkcionalnost
btnRoll.addEventListener('click', function () {
  if (playing) {
    //biram broj od 1 do 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    //postavljam da se img vidi i menjam src kako bi se prikazivala slicica u skladu sa random brojem
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // dodaj dice na current skor
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //promena na drugog igraca
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //dodajem skor aktivnom igracu
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Proveri da li je skor prejer veci ili jednako od 100
    if (scores[activePlayer] >= 20) {
      //zavrsi igru kada skor dodje do 100
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //promena na drugog igraca
      switchPlayer();
    }
  }
});
