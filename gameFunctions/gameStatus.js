import { ConfigReady } from "./settingGame.js";
import { BasicEnemy, createEnemy } from "../objectSets/enemy.js";


const moneyDiv = document.querySelector('#money');
const keyPress = {
    'a': false,
    'd': false,
    'w': false,
    's': false
};
const gunAmmo = document.querySelector('#ammo');

let enemySpawn = '';
let personWalk = '';
let enemyShoot = '';

export class Current_Game {
    gameResume = false
    gamePause = true
    constructor(personOne, Enemys, Coins) {
        this.personOne = personOne;
        this.enemies = Enemys
        this.coins = Coins;
        this.clickHandler = this.clickHandler.bind(this);
        this.moveHandler = this.moveHandler.bind(this);
    }
    start() {
        if(!this.gameResume) {
            this.gameResume = true;
            this.gamePause = false;

            enemySpawn = setInterval(() => {
                if(this.enemies.length < 5) {
                    createEnemy(this.enemies);
                    if (ConfigReady.speedSpawn < 500) {
                        ConfigReady.speedSpawn = 500;
                    }
                }
            }, (ConfigReady.speedSpawn-=100));

            personWalk = setInterval(() => {
                if (keyPress['a']) this.personOne.walkLeft();
                if (keyPress['d']) this.personOne.walkRight();
                if (keyPress['w']) this.personOne.walkUp();
                if (keyPress['s']) this.personOne.walkDown();
                this.coins.forEach(coin => {
                    let i = 0;
                    if(this.personOne.take(coin)) {
                        moneyDiv.innerHTML = this.personOne.money;
                        this.coins.splice(i, 1);
                    };
                    i++;
                });

                this.enemies.forEach(enemy => {
                    if(enemy.name == 'gunEnemy') {
                        enemy.aimPlayer(this.personOne.playerType.getBoundingClientRect())
                    }
                    else {
                        enemy.runToPlayer();
                    }
                    enemy.attackPlayer();
                });
            }, 16);

            enemyShoot = setInterval(() => {
                this.enemies.forEach(enemy => {
                    if(enemy.name == 'gunEnemy') {
                        enemy.shootPlayer(this.personOne);
                    }
                });
            }, 3000);

            document.addEventListener('mousemove', this.moveHandler);

            document.addEventListener('click', this.clickHandler);
            

            document.addEventListener('keydown', (event) => {
                switch (event.key.toLowerCase()) {
                    case 'a':
                        keyPress['a'] = true;
                        break;
                    case 'd':
                        keyPress['d'] = true;
                        break;
                    case 'w':
                        keyPress['w'] = true;
                        break;
                    case 's':
                        keyPress['s'] = true;
                        break;
                    case 'r':
                            setTimeout(() => {
                                this.personOne.gun.ammo = this.personOne.gun.baseAmmo;
                                gunAmmo.innerHTML = this.personOne.gun.ammo + '/' + this.personOne.gun.baseAmmo;
                            }, this.personOne.gun.reloadSpeed)
                            let i = 0;
                            attBar(i, this.personOne, this.clickHandler);
                        break;           
                }
                this.personOne.gun.moveGun(event);
            });
            
            document.addEventListener('keyup', (event) => {
                switch (event.key.toLowerCase()) {
                    case 'a':
                        keyPress['a'] = false;
                        break;
                    case 'd':
                        keyPress['d'] = false;
                        break;
                    case 'w':
                        keyPress['w'] = false;
                        break;
                    case 's':
                        keyPress['s'] = false;
                        break;
                }
                this.personOne.gun.moveGun(event);
            });

        }
    }
    pause() {
        if(!this.gamePause) {
            this.gamePause = true;
            this.gameResume = false;
            clearInterval(enemySpawn); 
            clearInterval(personWalk);
            clearInterval(enemyShoot);
            document.removeEventListener('click', this.clickHandler);
            document.removeEventListener('mousemove', this.moveHandler);
        }
    }

    //functions used to remove event listeners 
    clickHandler() {
        handleClickEvent(this.personOne, this.coins, this.enemies);
    }
    moveHandler() {
        move(event, this.personOne);
    }
    
}


function handleClickEvent(personOne, coins, enemies) {
    if (personOne.gun.ammo > 0) {
        personOne.gun.shoot(coins, enemies);
        personOne.gun.ammo = personOne.gun.ammo - 1;
        gunAmmo.innerHTML = personOne.gun.ammo + '/' + personOne.gun.baseAmmo;
        document.querySelector('#reload').style.width = (personOne.gun.ammo/personOne.gun.baseAmmo)*100 + "%";
    }
    else {
        setTimeout(() => {
            personOne.gun.ammo = personOne.gun.baseAmmo;
            gunAmmo.innerHTML = personOne.gun.ammo + '/' + personOne.gun.baseAmmo;
        }, personOne.gun.reloadSpeed)
        let i = 0;
        attBar(i, personOne);
    }
}

function move(event, person) {
    person.gun.moveGun(event);
}

function attBar(i, personOne, clickHandler) {
    document.removeEventListener('click', clickHandler);
    setTimeout(() => {
        document.querySelector('#reload').style.width = (100*i)/(personOne.gun.reloadSpeed/16) + "%";
        if (i < (personOne.gun.reloadSpeed / 16)) {
            attBar(i + 1, personOne);
        }
    }, 16); 
    setTimeout(()=> {
        document.addEventListener('click', clickHandler);
    }, personOne.gun.reloadSpeed)
}
