import { ConfigReady } from "../gameFunctions/settingGame.js";
export class Wall {
    constructor(elementWall) {
        this.wallElement = elementWall;
    }
}

export const walls = [];
class WallFunction {
    editionMode = false;

    enableEdition() {
        this.editionMode = true;
    }

    basicDiv(divClass, event) {
        let div = document.createElement('div');
        div.classList.add(divClass)   
        if(this.editionMode) {
            div.style.top = event.clientY + 'px';
            div.style.left = event.clientX + 'px';
        }
        else {
            div.style.left = ((ConfigReady.containerAll.x+50) + Math.floor(Math.random() * (ConfigReady.containerAll.width-100))) + 'px';
            div.style.top = ((ConfigReady.containerAll.y) + Math.floor(Math.random() * (ConfigReady.containerAll.height-100)))  + 'px';
        }
        document.querySelector('#container').appendChild(div);
        walls.push(new Wall(div));
    }

    lineWall(event) {
        this.basicDiv('lineWall', event)
    }
}

export let wallFunctions = new WallFunction;