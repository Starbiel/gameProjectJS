import { ConfigReady } from "./settingGame.js";

export function wallColition(obj1, wallArray, speed, direction) {
    let auxBoll = true;
    let wallTouched;

    //container CHECK
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

export function fixPosition(position, elementTouched, person) {
    const rect2 = elementTouched.getBoundingClientRect();
    if(elementTouched.id != 'container') {
        switch (position) {
            case 'up':
                person.style.top = rect2.y + rect2.height + 1 + 'px'
                break;
            case 'down':
                person.style.top = rect2.y - person.getBoundingClientRect().height - 1 + 'px'
                break;
            case 'left':
                person.style.left = rect2.x + rect2.width + 1 + 'px'
                break;
            case 'right':
                person.style.left = rect2.x - person.getBoundingClientRect().width - 1 + 'px'
                break;
        }
    }
    else {
        switch (position) {
            case 'up':
                person.style.top = ConfigReady.containerAll.y + 1 + 'px';
                break;
            case 'down':
                person.style.top = (ConfigReady.containerAll.y + ConfigReady.containerHeight - person.getBoundingClientRect().height) - 1 + 'px'
                break;
            case 'left':
                person.style.left = ConfigReady.containerAll.x + 'px'
                break;
            case 'right':
                person.style.left = (ConfigReady.containerAll.x + ConfigReady.containerAll.width - person.getBoundingClientRect().width) + 'px'  
                break;
        }
    }
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