import { ConfigReady, crossoverTester, generateBullet } from '../gameFunctions/settingGame.js';
import { tangToAng } from '../gameFunctions/settingGame.js';
import { walls } from './walls.js';

let mouseX = 0;
let mouseY = 0;
let ang = 0;


class weapons {
    projectSpeed = 10;
    constructor(gun) {
        this.gunElement = gun;
    }

    moveGun(event) {
        if(!isNaN(event.clientX)) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }
        const rect = this.gunElement.getBoundingClientRect();
        let deltaY = mouseY-rect.top;
        let deltaX = mouseX-rect.left;
        ang = (deltaY)/(deltaX);
        ang = tangToAng(ang);
        //fix the angle
        if(deltaY > 0 && deltaX < 0) {
            ang = 180+ang;
        }
        else if(deltaY <= 0 && deltaX <= 0) {
            ang = 180+ang;
        }
        else if(deltaY <= 0 && deltaX >= 0) {
            ang = 360+ang;
        }
        this.gunElement.style.transform = "rotate(" + ang + "deg)";
    }

    shoot(Coins, enemies) {
        let angAux = ang;
        let div = generateBullet(ang, this.gunElement);
        let interval = setInterval(() => {
            div.style.top = div.offsetTop + Math.sin(angAux*Math.PI/180)*this.projectSpeed + 'px';
            div.style.left = div.offsetLeft + Math.cos(angAux*Math.PI/180)*this.projectSpeed + 'px';
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
            let i = 0
            enemies.forEach(inimigo => {
                if (crossoverTester(div, inimigo.enemy)) {
                        inimigo.life -= this.damage;
                        lifeElement(inimigo, this.damage);
                        if (inimigo.death(Coins)) {
                            enemies.splice(i, 1);
                        };
                    div.remove();
                    clearInterval(interval);
                }
                i++; 
            });
        }, 10);
    }
}

export class Pistol extends weapons {
    price = 500;
    singleShot = true;
    autoShot = false;
    damage = 21;
    ammo = 20;
    baseAmmo = 20;
    reloadSpeed = 1000;
}

export class ShootGun extends weapons {
    price = 1500;
    singleShot = true;
    autoShot = false;
    damage = 51;
    ammo = 10;
    baseAmmo = 10;
    reloadSpeed = 3000;
}



//Object and number
function lifeElement(object, damage) {
    const divLife = object.enemy.children;
    let widthLenght = divLife[0].offsetWidth
    let parentWidth = object.enemy.offsetWidth;
    let lossLifePor = 100 - 100*((object.originalLife-damage)/object.originalLife);
    widthLenght = Math.round(100 * widthLenght / parentWidth);
    divLife[0].style.width = widthLenght - lossLifePor + "%";
}