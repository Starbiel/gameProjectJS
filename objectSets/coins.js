import { ConfigReady } from '../gameFunctions/settingGame.js';

export class Coin {
    static id = 0;
    value = ConfigReady.moneyValue;
    constructor(coin) {
        this.id = Coin.id++;
        this.coin = coin
        this.positionX = this.positionLeft(coin);
        this.positionY = this.positionTop(coin);
    }
    destructor() {
        this.coin.style.backgroundColor = 'transparent';
    }
    positionTop(coin) {
        return coin.getBoundingClientRect().y;
    }

    positionLeft(coin) {
        return coin.getBoundingClientRect().x;
    }

}