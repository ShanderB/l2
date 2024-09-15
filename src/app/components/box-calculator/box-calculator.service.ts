import { Injectable } from '@angular/core';
import { AvailableBoxes } from '../../entities/available-boxes';
import { getBestBoxForDelivery } from '../../services/find-box-service';
import { Game } from '../../entities/game';

@Injectable({
    providedIn: 'root'
})
export class BoxCalculatorService {
    availableBoxes: AvailableBoxes[] = [
        { height: 10, width: 10, length: 10 },
        { height: 20, width: 20, length: 20 },
        { height: 30, width: 30, length: 30 },
        { height: 40, width: 40, length: 40 },
        { height: 50, width: 50, length: 50 }
    ];

    constructor() { }

    onCalculate(games: Game[]): AvailableBoxes[] {
        const bestBoxes = getBestBoxForDelivery(games, this.availableBoxes);
        if (bestBoxes.length === 0) {
            return [];
        }

        return bestBoxes;

    }
}