import { wallTypes } from "../WallController";

export class Wall {
	_elem = null;

	constructor({ type }) {
		if (wallTypes.includes(type)) {
			this._elem = document.createElement("div");
			this._elem.classList.add(type);
		}
	}

	get elem() {
		return this._elem;
	}
}
