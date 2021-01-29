
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
// make sure it's not the same hole every time
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min,max){
  // get a random amount of time that it's going to be popping itself up
  return Math.round(Math.random()*(max - min) + min);
}

function randomHole(holes){
  const idx = Math.floor(Math.random()*holes.length);
  const hole = holes[idx];
  // make sure it's not the same hole every time
  if(hole === lastHole){
    return randomHole(holes);
  }
  lastHole = hole;
  return hole
}

  
function peep() {
  const time = randTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time); 
}

function startGame(){
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0; 
  peep();
  setTimeout(() => timeUp = true, 10000);
}

function bonk(e){
  if(!e.isTrusted) return; // cheater!
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));