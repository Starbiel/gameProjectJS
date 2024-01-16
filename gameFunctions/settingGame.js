import { difficults } from "../constants/difficults.js";

//FEITO => src/config/Config -> Para criar, use: new Config({difficult: diffValue, area: areaValue})
class Config {
	//vw and vh
	//gameArea = [80,50];
	constructor(difficult, area) {
		if (!difficults[difficult]) throw new Error("Difficult not found");
		this.difficult = difficults[difficult];
		Object.entries(this.difficult).forEach(([key, value]) => {
			this[key] = value;
		});
		//
		this.gameArea = area;
	}

	//FEITO => src/config/Config -> Para acessar, use: config.createArena()
	//RENOMEADO => createArea() se tornou createArena()
	createArea() {
		//Esses this se tornaram "get" que consomem o valor dos atributos de this._arena
		//RENOMEADO => const area se tornou this._arena
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

//FEITO => src/config/Config/config -> Para acessar, use: config
export let ConfigReady = new Config("hard", [80, 60]);

//FEITO => src/functions/crossOver/isCrossover -> Para acessar, use: isCrossover(obj1, obj2)
export function crossoverTester(obj1, obj2) {
	const ret1 = obj1.getBoundingClientRect();
	const ret2 = obj2.getBoundingClientRect();
	return (
		ret1.left < ret2.left + ret2.width &&
		ret1.left + ret1.width > ret2.left &&
		ret1.top < ret2.top + ret2.height &&
		ret1.top + ret1.height > ret2.top
	);
}

//FALTA => Colocar no local correto
export function generateCoins(y, x) {
	let coins = document.createElement("div");
	coins.classList.add("coin");
	coins.style.left = x + "px";
	coins.style.top = y + "px";
	document.querySelector("#container").appendChild(coins);
	return coins;
}

//FALTA => Colocar no local correto
export function tangToAng(tg) {
	const anguloRadianos = Math.atan(tg);
	const anguloGraus = (anguloRadianos * 180) / Math.PI;
	return anguloGraus;
}

//FALTA => Colocar no local correto
export function generateBullet(ang, gunElement) {
	const div = document.createElement("div");
	div.classList.add("bullet");
	div.style.transform = "rotate(" + ang + "deg)";
	div.style.top = gunElement.getBoundingClientRect().top + 2 + "px";
	div.style.left = gunElement.getBoundingClientRect().left - 5 + "px";
	document.querySelector("#bullets").appendChild(div);
	return div;
}
