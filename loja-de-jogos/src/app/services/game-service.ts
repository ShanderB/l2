import { Injectable } from '@angular/core';
import { Game } from '../entities/game';
import { GameUseCase } from '../use-cases/game/game.use-case';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private readonly gameUseCase: GameUseCase) { }

  addNewGame(game: Game): Observable<Game> {
    return this.gameUseCase.addGame(game);
  }

  getAllGames(): Observable<Game[]> {
    return this.gameUseCase.getGames();
  }
}