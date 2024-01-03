import { Pistol, ShootGun } from "../objectSets/guns.js";
import { personOne } from "../script.js";

let Gun = document.getElementById('gun');
const buttonSelect = document.getElementsByTagName('button');

for(let i=0; i<buttonSelect.length; i++) {
    buttonSelect[i].addEventListener('click', buyWeapon);
}

function buyWeapon() {
    personOne.changeGun(this.innerHTML);
}