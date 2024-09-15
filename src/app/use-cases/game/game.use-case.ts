import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../entities/game';
import { GameGateway } from '../../gateways/game.gateway';

@Injectable({
    providedIn: 'root'
})
export class GameUseCase {
    constructor(private gameGateway: GameGateway) { }

    addGame(game: Game): Observable<Game> {
        return this.gameGateway.addGame(game);
    }

    getGames(): Observable<Game[]> {
        return this.gameGateway.getGames();
    }
}