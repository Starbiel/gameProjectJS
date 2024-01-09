
import { difficults } from "../constants/difficults.js";

class Config {
	//vw and vh
	//gameArea = [80,50];
	constructor(difficult, area) {
		if (!difficults[difficult]) 
            throw new Error("Difficult not found");
		this.difficult = difficults[difficult];
		Object.entries(this.difficult).forEach(([key, value]) => {
			this[key] = value;
		});
		this.gameArea = area;
	}

	createArea() {
		const area = document.querySelector("#container");
		area.style.width = this.gameArea[0] + "vw";
		area.style.height = this.gameArea[1] + "vh";
		this.containerWidth = area.offsetWidth;
		this.containerHeight = area.offsetHeight;
		this.containerAll = area.getBoundingClientRect();
		this.containerElement = area;
		const gunAmmo = document.querySelector("#ammo");
		gunAmmo.style.top = this.containerHeight + "px";
	}
}

export let ConfigReady = new Config("hard", [80, 60]);

//arg function are html elements(obj);

export function crossoverTester(obj1, obj2) {
    const ret1 = obj1.getBoundingClientRect();
    const ret2 = obj2.getBoundingClientRect();
    return (
        ret1.left < ret2.left + ret2.width &&
        ret1.left + ret1.width > ret2.left &&
        ret1.top < ret2.top + ret2.height  &&
        ret1.top + ret1.height > ret2.top
    );
}

//obj1(HTML ELEMENT WALL) obj2(HTML ELEMENT PLAYER) speed(INT SPEED PLAYER) direction(string Direction)
function crossTwo(obj1, obj2, speed = 0, direction) {
    const ret1 = obj1.getBoundingClientRect();
    const ret2 = obj2.getBoundingClientRect();
    if(direction == 'left' || direction == 'up') {
        speed *= -1;
    }
    if(direction == 'up' || direction == 'down') {
        return (
            ret1.top < ret2.top + ret2.height + speed  &&
            ret1.top + ret1.height > ret2.top + speed &&
            ret1.left < ret2.left + ret2.width &&
            ret1.left + ret1.width > ret2.left
        )
    }
    else if(direction == 'left' || direction == 'right') {
        return (
            ret1.left < ret2.left + ret2.width + speed &&
            ret1.left + ret1.width > ret2.left + speed &&
            ret1.top < ret2.top + ret2.height  &&
            ret1.top + ret1.height > ret2.top 
        )
    }
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
export function wallColition(obj1, wallArray, speed, direction) {
    let auxBoll = true;
    let wallTouched;

    if(!(ConfigReady.containerAll.height+ConfigReady.containerAll.y - speed - obj1.getBoundingClientRect().height >= obj1.getBoundingClientRect().y) && (direction == 'down')) {
        //down
        return [!auxBoll, ConfigReady.containerElement,direction]
    }
    else if(!(obj1.getBoundingClientRect().y-ConfigReady.containerAll.y >= speed)  && (direction == 'up')) {
        //up
        return [!auxBoll, ConfigReady.containerElement,direction]
    }
    else if(!(ConfigReady.containerAll.width+ConfigReady.containerAll.x-speed-obj1.getBoundingClientRect().width >= obj1.getBoundingClientRect().x) && (direction == 'right')) {
        //right
        return [!auxBoll, ConfigReady.containerElement,direction]
    }
    else if(!(obj1.getBoundingClientRect().x-ConfigReady.containerAll.x >= speed)  && (direction == 'left')) {
        //left
        return [!auxBoll, ConfigReady.containerElement,direction]
    }


    wallArray.forEach((wall) => {
            if(crossTwo(wall.wallElement, obj1, speed, direction)) {
                auxBoll = false;
                wallTouched = wall.wallElement;
            };
        }
    )

    return [auxBoll, wallTouched, direction];
}

