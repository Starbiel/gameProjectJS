import { lastDirectionFix } from "../objectSets/playerSet.js";
import { personOne } from "../script.js";
class Config {
    //vw and vh
    //gameArea = [80,50];
    constructor(difficult, area) {
        if(difficult == 'normal') {
            this.playerSpeed = 5;
            this.moneyValue = 50;
            this.speedSpawn = 3500;
            this.enemyLife = 100;
            this.enemySpeed = 3;
            this.speedEnemyShoot = 5;
            this.shooterEnemy = 55;
        }
        else if(difficult == 'easy') {
            this.playerSpeed = 7;
            this.moneyValue = 100;
            this.speedSpawn = 4000; //ms
            this.enemyLife = 80;
            this.enemySpeed = 3;
            this.speedEnemyShoot = 3;
            this.shooterEnemy = 40;
        }
        else {
            this.playerSpeed = 2;
            this.moneyValue = 320;
            this.speedSpawn = 4000;
            this.enemyLife = 150;
            this.enemySpeed = 1;
            this.speedEnemyShoot = 7;
            this.shooterEnemy = 70;
        }
        this.gameArea = area;
    }

    createArea() {
        const area = document.querySelector('#container');
        area.style.width = this.gameArea[0] + 'vw';
        area.style.height = this.gameArea[1] + 'vh';
        this.containerWidth = area.offsetWidth;
        this.containerHeight = area.offsetHeight;
        this.containerAll = area.getBoundingClientRect();
        this.containerElement = area;
        const gunAmmo = document.querySelector('#ammo');
        gunAmmo.style.top = this.containerHeight + 'px';
    }

}

export let ConfigReady = new Config('hard', [80,60]);


//arg function are html elements(obj);

export function crossoverTester(obj1, obj2) {
    return (
        obj1.getBoundingClientRect().x < obj2.getBoundingClientRect().x + obj2.getBoundingClientRect().width &&
        obj1.getBoundingClientRect().x + obj1.getBoundingClientRect().width  > obj2.getBoundingClientRect().x &&
        obj1.getBoundingClientRect().y < obj2.getBoundingClientRect().y + obj2.getBoundingClientRect().height &&
        obj1.getBoundingClientRect().y + obj1.getBoundingClientRect().height > obj2.getBoundingClientRect().y
    );
}


//Position's enemy
export function generateCoins(y, x) {
    let coins = document.createElement('div');
    coins.classList.add('coin');
    coins.style.left = x + 'px';
    coins.style.top = y + 'px';
    document.querySelector('#container').appendChild(coins);
    return coins;
}

//float 
export function tangToAng(tg) {
    const anguloRadianos = Math.atan(tg);
    const anguloGraus = (anguloRadianos * 180) / Math.PI;
    return anguloGraus;
}

export function generateBullet(ang, gunElement) {
    const div = document.createElement('div');
    div.classList.add('bullet');
    div.style.transform = "rotate(" + ang + "deg)";
    div.style.top = gunElement.getBoundingClientRect().top+2 + 'px';
    div.style.left = gunElement.getBoundingClientRect().left-5 + 'px';
    document.querySelector('#bullets').appendChild(div);
    return div;
}

// elemento do player, array de parede, velocidade do player
export function wallColition(obj1, wallArray, speed) {
    let auxBoll = true;
    let wallTouched;

    if(!(ConfigReady.containerAll.height+ConfigReady.containerAll.y - speed - obj1.getBoundingClientRect().height >= obj1.getBoundingClientRect().y)) {
        //down
        personOne.fixPositionMax('down', ConfigReady.containerElement)
        lastDirectionFix['down'] = true;
    }
    else if(!(obj1.getBoundingClientRect().y-ConfigReady.containerAll.y >= speed)) {
        //up
        personOne.fixPositionMax('up', ConfigReady.containerElement)
        lastDirectionFix['up'] = true;
    }
    else if(!(ConfigReady.containerAll.width+ConfigReady.containerAll.x-speed-obj1.getBoundingClientRect().width >= obj1.getBoundingClientRect().x)) {
        //right
        personOne.fixPositionMax('right', ConfigReady.containerElement)
        lastDirectionFix['right'] = true;
    }
    else if(!(obj1.getBoundingClientRect().x-ConfigReady.containerAll.x >= speed)) {
        //left
        personOne.fixPositionMax('left', ConfigReady.containerElement)
        lastDirectionFix['left'] = true;
    }


    wallArray.forEach((wall) => {
            if(crossoverTester(obj1, wall.wallElement)) {
                auxBoll = false;
                wallTouched = wall.wallElement;
            };
        }
    )

    return [auxBoll, wallTouched];
}

