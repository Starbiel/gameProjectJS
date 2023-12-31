import { ConfigReady, wallColition } from '../gameFunctions/settingGame.js';
import { ShootGun, Pistol  } from './guns.js';
import { crossoverTester } from '../gameFunctions/settingGame.js';
import { walls } from './walls.js';

let price = 0;
let resultCross = [];


export class Player {
    health = 100;
    speed = ConfigReady.playerSpeed;
    money = 0;
    constructor(player, gun) {
        this.playerType = player
        this.positionX = this.positionLeft(player);
        this.positionY = this.positionTop(player);
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
    
    positionTop(player) {
        return player.getBoundingClientRect().y;
    }

    positionLeft(player) {
        return player.getBoundingClientRect().x;
    }


    //walk manipulation
    fixPositionMax(position, elementTouched) {
            const rect2 = elementTouched.getBoundingClientRect();
            if(elementTouched.id != 'container') {
                switch (position) {
                    case 'up':
                        this.playerType.style.top = rect2.y + rect2.height + 1 + 'px'
                        break;
                    case 'down':
                        this.playerType.style.top = rect2.y - this.playerType.getBoundingClientRect().height - 1 + 'px'
                        break;
                    case 'left':
                        this.playerType.style.left = rect2.x + rect2.width + 1 + 'px'
                        break;
                    case 'right':
                        this.playerType.style.left = rect2.x - this.playerType.getBoundingClientRect().width - 1 + 'px'
                        break;
                }
            }
            else {
                switch (position) {
                    case 'up':
                        this.playerType.style.top = ConfigReady.containerAll.y + 1 + 'px';
                        this.positionY = ConfigReady.containerAll.y + 1;
                        break;
                    case 'down':
                        this.playerType.style.top = (ConfigReady.containerAll.y + ConfigReady.containerHeight - this.playerType.getBoundingClientRect().height - this.speed) - 1 + 'px'
                        this.positionY = (ConfigReady.containerAll.y + ConfigReady.containerHeight - this.playerType.getBoundingClientRect().height - this.speed) - 1;
                        break;
                    case 'left':
                        this.playerType.style.left = ConfigReady.containerAll.x + 'px'
                        this.positionX = ConfigReady.containerAll.x;
                        break;
                    case 'right':
                        this.playerType.style.left = (ConfigReady.containerAll.x + ConfigReady.containerAll.width - this.playerType.getBoundingClientRect().width) + 'px'
                        this.positionX = ConfigReady.containerAll.x + ConfigReady.containerAll.width - this.playerType.getBoundingClientRect().width;
                        break;
                }
            }
    }

    walk(position, type) {
        if(position == 'x') {
            if(type == '+') {
                this.playerType.style.left = this.positionX + this.speed + 'px';    
            }
            else {
                this.playerType.style.left = this.positionX - this.speed + 'px';
            }
            this.positionX = this.positionLeft(this.playerType);
        }
        else if(position == 'y') {
            if(type == '+') {
                this.playerType.style.top = this.positionY + this.speed + 'px'; 
            }
            else {
                this.playerType.style.top = this.positionY - this.speed + 'px';
            }
            this.positionY = this.positionTop(this.playerType);
        } 
    }

    //walk commands
    
    walkLeft() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'left');
            if(resultCross[0]) {
                this.walk('x','-')
            }
            else {
                this.fixPositionMax(resultCross[2], resultCross[1]);
            }
    }

    walkRight() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'right');
            if(resultCross[0]) {
                this.walk('x', '+');
            }
            else {
                this.fixPositionMax(resultCross[2], resultCross[1]);
            } 
    }

    walkUp() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'up');
            if(resultCross[0]) {
                this.walk('y', '-');
            }
            else {
                this.fixPositionMax(resultCross[2], resultCross[1]);
            }
    }

    walkDown() {
            resultCross = wallColition(this.playerType, walls, this.speed, 'down');
            if(resultCross[0]) {
                this.walk('y', '+');
            }
            else {
                this.fixPositionMax(resultCross[2], resultCross[1]);
            }  
    }

}
