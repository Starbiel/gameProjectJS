import { ConfigReady } from "../gameFunctions/settingGame.js";

//FEITO => src/model/Wall -> Para criar, use: new Wall({type: typeValue})
export class Wall {
    constructor(elementWall) {
        this.wallElement = elementWall;
    }
}

//FEITO => src/WallController -> Para acessar, use: wallController.walls
export const walls = [];

//FEITO => src/WallController -> Para criar, use: new WallController()
class WallFunction {
    editionMode = false;

    enableEdition() {
        this.editionMode = true;
    }

    //FEITO => src/WallController -> Para acessar, use: wallController.create({type: typeValue, event: eventValue})
    basicDiv(divClass, event) {
        let div = document.createElement('div');
        div.classList.add(divClass)
        if(divClass == 'randomWall') {
            div.style.width = (1 + Math.floor(Math.random() * 5)) + '%';
            div.style.height = (1 + Math.floor(Math.random() * 5)) + '%';
        }
        if(this.editionMode) {
            div.style.top = event.clientY + 'px';
            div.style.left = event.clientX + 'px';
        }
        else {
            div.style.left =  ConfigReady.containerAll.x + Math.floor(Math.random() * (ConfigReady.containerAll.width - div.clientWidth))  + 'px';
            div.style.top = ((ConfigReady.containerAll.y) + Math.floor(Math.random() * (ConfigReady.containerAll.height-100)))  + 'px';
        }
        document.querySelector('#container').appendChild(div);
        walls.push(new Wall(div));
    }

    //FEITO => src/WallController 
    //Para acessar, use: wallController.create({type: valueType, event: valueType}), sendo typeValue = "line"
    lineWall(event) {
        this.basicDiv('lineWall', event)
    }

    //FEITO => src/WallController 
    //Para acessar, use: wallController.create({type: valueType, event: valueType}), sendo typeValue = "random"
    randomWall(event) {
        this.basicDiv('randomWall', event);
    }
}

//FEITO => src/WallController -> Para acessar, use: wallController
export let wallFunctions = new WallFunction;