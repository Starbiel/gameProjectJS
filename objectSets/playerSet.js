import { ConfigReady } from '../gameFunctions/settingGame.js';
import { ShootGun, Pistol  } from './guns.js';
import { crossoverTester } from '../gameFunctions/settingGame.js';
import { walls } from './walls.js';
import { wallColition, fixPosition } from '../gameFunctions/wallCollision.js';
let price = 0;
let resultCross = [];


export class Character {

    constructor(player) {
        this.playerType = player
    }

    walk(position, type) {
        if(position == 'x') {
            if(type == '+') {
                this.playerType.style.left = this.playerType.getBoundingClientRect().x+ this.speed + 'px';    
            }
            else {
                this.playerType.style.left = this.playerType.getBoundingClientRect().x - this.speed + 'px';
            }
        }
        else if(position == 'y') {
            if(type == '+') {
                this.playerType.style.top = this.playerType.getBoundingClientRect().y + this.speed + 'px'; 
            }
            else {
                this.playerType.style.top = this.playerType.getBoundingClientRect().y - this.speed + 'px';
            }
        } 
    }

    //walk commands
    
    walkLeft() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'left');
            if(resultCross[0]) {
                this.walk('x','-')
            }
            else {
                fixPosition(resultCross[2], resultCross[1], this.playerType);
            }
    }

    walkRight() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'right');
            if(resultCross[0]) {
                this.walk('x', '+');
            }
            else {
                fixPosition(resultCross[2], resultCross[1], this.playerType);
            } 
    }

    walkUp() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'up');
            if(resultCross[0]) {
                this.walk('y', '-');
            }
            else {
                fixPosition(resultCross[2], resultCross[1], this.playerType);
            }
    }

    walkDown() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'down');
            if(resultCross[0]) {
                this.walk('y', '+');
            }
            else {
                fixPosition(resultCross[2], resultCross[1], this.playerType);
            }  
    }

}

export class Player extends Character {
    health = 100;
    speed = ConfigReady.playerSpeed;
    money = 0;

    constructor(player, gun) {
        super(player);
        this.gun = new Pistol(gun);
        this.gunElement = gun
    }

    changeGun(string) {
        switch (string) {
            case 'Pistol':
                price = new Pistol(this.gunElement);
                if(this.money >= price.price) {
                    this.gun = new Pistol(this.gunElement);
                    this.money -= price.price;
                }
                else {
                    document.querySelector('#error').innerHTML = 'Sem Dinheiro';
                } 
                break;
            case 'Shootgun':
                price = new ShootGun(this.gunElement);
                if(this.money >= price.price) {
                    this.gun = new ShootGun(this.gunElement);
                    this.money -= price.price;
                }
                else {
                    document.querySelector('#error').innerHTML = 'Sem Dinheiro';
                } 
                break;
            default:
                break;
        }
        document.querySelector('#money').innerHTML = this.money;
    }

    take(coin) {
        if(crossoverTester(this.playerType, coin.coin)) {
            this.money += coin.value;
            coin.destructor();
            return true;
        }
    }

    death() {
        location.reload();
    }
}