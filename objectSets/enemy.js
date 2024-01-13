import { Coin } from './coins.js';
import { ConfigReady, generateCoins, tangToAng, generateBullet} from '../gameFunctions/settingGame.js';
import { personOne } from '../script.js';
import { crossoverTester } from '../gameFunctions/settingGame.js';
import { walls } from './walls.js';
import { Character } from './playerSet.js';

class Enemy extends Character {
    setAux = '';
    life = ConfigReady.enemyLife;
    originalLife = ConfigReady.enemyLife;
    speed = ConfigReady.enemySpeed;
    damage = 20;

    constructor(enemyElement) {
        super(enemyElement);
        this.enemy = enemyElement;
    }

    death(dropCoin) {
        if(this.life <= 0) {
            if (Math.floor(Math.random() * 100) < 100) {
                let newCoin = generateCoins(this.enemy.getBoundingClientRect().y, this.enemy.getBoundingClientRect().x)
                dropCoin.push(new Coin(newCoin));
            }
            this.enemy.remove();
            clearInterval(this.setAux);
            return true;
        } 
    }

    attackPlayer() {
        if(crossoverTester(this.enemy, personOne.playerType)) {
            if(this.setAux == '') {
                personOne.health -= this.damage;
                lifeElement(personOne, this.damage)
                if(personOne.health <= 0) {
                    personOne.death();
                }
                this.setAux = setInterval(() => {
                    personOne.health -= this.damage;
                    lifeElement(personOne, this.damage);
                    if(personOne.health <= 0) {
                        personOne.death();
                    }
                }, 5000);
            }
        }
        else {
            clearInterval(this.setAux);
            this.setAux = '';
        } 
    }
}

export class BasicEnemy extends Enemy {
    name = 'enemyNoGun';
    runToPlayer() {
        let tgAng = 0;
        if(personOne.playerType.getBoundingClientRect().x != this.enemy.getBoundingClientRect().x) {
            tgAng = (personOne.playerType.getBoundingClientRect().y - this.enemy.getBoundingClientRect().y)/(personOne.playerType.getBoundingClientRect().x-this.enemy.getBoundingClientRect().x);
        }
        //fix the angle
        if((personOne.playerType.getBoundingClientRect().y > this.enemy.getBoundingClientRect().y && personOne.playerType.getBoundingClientRect().x > this.enemy.getBoundingClientRect().x)||
        (personOne.playerType.getBoundingClientRect().y < this.enemy.getBoundingClientRect().y && personOne.playerType.getBoundingClientRect().x > this.enemy.getBoundingClientRect().x)) {
            tgAng = tgAng*-1;
        }

        //move for X plan
        if(personOne.playerType.getBoundingClientRect().x > this.enemy.getBoundingClientRect().x) {
            this.walkRight()
        }
        else if(personOne.playerType.getBoundingClientRect().x < this.enemy.getBoundingClientRect().x) {
            this.walkLeft()
        }
        
        //move for y plan usign the ang
        if(tgAng > 0) {
            this.walkUp()
        }
        else if(tgAng < 0) {
            this.walkDown()
        }
        else if(tgAng == 0) {
            if(personOne.playerType.getBoundingClientRect().y > this.enemy.getBoundingClientRect().y) {
                this.walkDown();
            }
            else {
                this.walkUp();
            }
        }
    }
}

export class GunEnemy extends Enemy {
    name = 'gunEnemy';
    ang = 0;
    constructor(enemy, element) {
        super(enemy);
        this.gunElement = element
    }
    aimPlayer(player) {
        let deltaY = (player.y)-(this.enemy.getBoundingClientRect().y);
        let deltaX = (player.x)-(this.enemy.getBoundingClientRect().x);
        this.ang = (deltaY)/(deltaX);
        this.ang = tangToAng(this.ang);
        //fix the angle
        if(deltaY > 0 && deltaX < 0) {
            this.ang = 180+this.ang;
        }
        else if(deltaY <= 0 && deltaX <= 0) {
            this.ang = 180+this.ang;
        }
        else if(deltaY <= 0 && deltaX >= 0) {
            this.ang = 360+this.ang;
        }
        this.gunElement.style.transform = "rotate(" + this.ang + "deg)";
    }

    shootPlayer(player) {
        let angAux = this.ang;
        let div =  generateBullet(angAux, this.gunElement);
        let interval = setInterval(() => {
            div.style.top = div.offsetTop + Math.sin(angAux*Math.PI/180)*ConfigReady.speedEnemyShoot + 'px';
            div.style.left = div.offsetLeft + Math.cos(angAux*Math.PI/180)*ConfigReady.speedEnemyShoot+ 'px';
            if(div.offsetTop > (ConfigReady.containerAll.top+ConfigReady.containerHeight-5)
                || div.offsetTop < ConfigReady.containerAll.top
                || div.offsetLeft > (ConfigReady.containerAll.x+ConfigReady.containerWidth-5) 
                || div.offsetLeft < ConfigReady.containerAll.x)
            {
                    div.remove();
                    clearInterval(interval);
            }
            walls.forEach((wall) => {
                if(crossoverTester(wall.wallElement, div)) {
                    div.remove();
                    clearInterval(interval);
                }
            })
            if(crossoverTester(div, player.playerType)) {
                player.health -= 20;
                lifeElement(personOne, 20)
                if(personOne.health <= 0) {
                    personOne.death();
                }
                div.remove();
                clearInterval(interval);
            }
        }, 10);
    }
}

//functions that involve enemy

function lifeElement(object, damage) {
    const divLife = object.playerType.children;
    let widthLenght = divLife[1].offsetWidth;
    let parentWidth = object.playerType.offsetWidth;
    widthLenght = Math.round(100 * widthLenght / parentWidth);
    divLife[1].style.width = widthLenght - damage + "%";
}

function divLife() {
    const div = document.createElement('div');
    div.classList.add('life');
    return div;
}

export function createEnemy (enemiesArray) {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = ((ConfigReady.containerAll.x+50) + Math.floor(Math.random() * (ConfigReady.containerAll.width-100))) + 'px';
    enemy.style.top = ((ConfigReady.containerAll.y) + Math.floor(Math.random() * (ConfigReady.containerAll.height-100)))  + 'px';
    enemy.appendChild(divLife());
    
    if(Math.random()*100 <= ConfigReady.shooterEnemy) {
       let gunElement = addGun(enemy);
       enemiesArray.push(new GunEnemy(enemy, gunElement)); 
    }
    else {
        enemiesArray.push(new BasicEnemy(enemy));
    }
    document.querySelector('#container').appendChild(enemy);
    return enemy;
}

function addGun(enemy) {
    let gunElement = document.createElement('div');
    gunElement.classList.add('gun');
    enemy.appendChild(gunElement);
    return gunElement;
}