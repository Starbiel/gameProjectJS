import { ConfigReady } from '../gameFunctions/settingGame.js';
import { ShootGun, Pistol  } from './guns.js';
import { crossoverTester } from '../gameFunctions/settingGame.js';

let price = 0;

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
        if(coin !== '') {
            if(crossoverTester(this.playerType, coin.coin)) {
                this.money += coin.value;
                coin.destructor();
                return true;
            }
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
    fixPositionMax(position, type) {
        if(position == 'x') {
            if(type == '+') {
                this.playerType.style.left = (ConfigReady.containerAll.width+ConfigReady.containerAll.x) - this.playerType.getBoundingClientRect().width + 'px';
                this.positionX = ConfigReady.containerAll.width+ConfigReady.containerAll.x - this.playerType.getBoundingClientRect().width;
            }
            else {
                this.playerType.style.left = ConfigReady.containerAll.x + 'px';
                this.positionX = ConfigReady.containerAll.x;
            }
        }
        else if(position == 'y') {
            if(type == '+') {
                this.playerType.style.top = (ConfigReady.containerAll.height+ConfigReady.containerAll.y) - this.playerType.getBoundingClientRect().height + 'px';
                this.positionY = (ConfigReady.containerAll.height+ConfigReady.containerAll.y) - this.playerType.getBoundingClientRect().height;
            }
            else {
                this.playerType.style.top = ConfigReady.containerAll.y + 'px';
                this.positionY = ConfigReady.containerAll.y;
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
        if(this.positionX-ConfigReady.containerAll.x >= this.speed) {
            this.walk('x','-')
        }
        else {
            this.fixPositionMax('x','-');
        } 
    }

    walkRight() {
        if(ConfigReady.containerAll.width+ConfigReady.containerAll.x-this.speed-this.playerType.getBoundingClientRect().width >= this.positionX) {
            this.walk('x', '+');
        }
        else {
            this.fixPositionMax('x','+');
        } 
    }

    walkUp() {
        if(this.positionY-ConfigReady.containerAll.y >= this.speed) {
            this.walk('y', '-');
        }
        else {
            this.fixPositionMax('y','-');
        }
    }

    walkDown() {
        if(ConfigReady.containerAll.height+ConfigReady.containerAll.y-this.speed-this.playerType.getBoundingClientRect().height >= this.positionY) {
            this.walk('y', '+');
        }
        else {
            this.fixPositionMax('y','+');
        }  
    }

}