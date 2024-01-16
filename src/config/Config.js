import { difficults } from "../../constants/difficults.js";

class Config {
    _arena = null;
	//difficult = key of difficults (constants/difficults);
	//area = dimension = {width: number, height: number}
    //gameArea se tornou dimension pois não se refere a um valor "²" e sim a uma dimensão
	constructor({ difficult = "normal", dimension: { width = 80, height = 50 } }) {
		if (difficults[difficult] === undefined)
			throw new Error("Difficult not found");
		this.difficult = difficults[difficult];
		for (let key in this.difficult) {
			this[key] = this.difficult[key];
		}
		this.dimension = { width, height };
	}

    //Recomendo chamar de arena. Area é um termo muito genérico
    createArena() {
        this._arena = document.querySelector("#container");
        this._arena.style.width = this.dimension.width + "vw";
        this._arena.style.height = this.dimension.height + "vh";

        document.querySelector("#ammo").style.top = this.containerHeight + "px";
    }

    //Valores que antes eram salvos diretamente, agora são metodos
    //Assim os valores não podem ser alterados diretamente e, se mudarem de forma natural, os metodos se adaptam
    get containerWidth () {
        return this._arena.offsetWidth;
    }

    get containerHeight () {
        return this._arena.offsetHeight;
    }

    get containerAll () {
        return this._arena.getBoundingClientRect();
    }

    get containerElement () {
        return this._arena;
    }
}

export const config = new Config({ difficult: "hard", dimension: { width: 80, height: 60 } });