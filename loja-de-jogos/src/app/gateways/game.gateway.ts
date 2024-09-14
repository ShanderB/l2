import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../entities/game';

@Injectable({
    providedIn: 'root'
})
export class GameGateway {
    private games: Game[] = [];

    addGame(game: Game): Observable<Game> {
        this.games.push(game);
        return of(game);
    }

    getGames(): Observable<Game[]> {
        return of(this.games);
    }
}