import { Player } from '/objectSets/playerSet.js';
import { ConfigReady } from './gameFunctions/settingGame.js';
import { Current_Game } from './gameFunctions/gameStatus.js';
import { wallFunctions } from './objectSets/walls.js';

ConfigReady.createArea();

const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const playerOne = document.querySelector('#playerOne');
const Coins = []; //Array de moedas
const Enemys = []; //Array de inimigos
const Gun = document.getElementsByClassName('gun')[0];


export let personOne = new Player(playerOne, Gun);
let currentGame = new Current_Game(personOne, Enemys, Coins);

start.addEventListener('click', () => {
    currentGame.start();
})

wallFunctions.lineWall(event);


pause.addEventListener('click', () => {
    currentGame.pause();
})

