import { config } from "./config/Config.js";

//ATUALIZAR => Mover para arquivo que faça sentido
export const wallTypes = ["line", "random"];

class WallController {
	_editionMode = false;
    _walls = [];

	create({ type, event = null }) {
		if (wallTypes.includes(type)) {
			const newWall = new Wall({ type });
			if (type === "random") {
				newWall.elem.style.width = 1 + Math.floor(Math.random() * 5) + "%";
				newWall.elem.style.height = 1 + Math.floor(Math.random() * 5) + "%";
			}
            //Set the position of the wall (top && left)
			if (this._editionMode && event) {
				newWall.elem.style.top = event.clientY + "px";
				newWall.elem.style.left = event.clientX + "px";
			} else {
                newWall.elem.style.left = config.containerAll.x + Math.floor(Math.random() * (config.containerAll.width - newWall.elem.clientWidth)) + "px";
                newWall.elem.style.top = config.containerAll.y + Math.floor(Math.random() * (config.containerAll.height - 100)) + "px";
            }
            config.containerElement.appendChild(newWall.elem);
            walls.push(newWall);
		}
	}

	enableEdition() {
		this._editionMode = true;
	}

	disableEdition() {
		this._editionMode = false;
	}

    get walls() {
        return this._walls;
    }
}

//ATUALIZAR => Mover para local que faça sentido
export const wallController = new WallController;