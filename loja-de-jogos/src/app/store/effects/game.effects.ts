import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { GameUseCase } from '../../use-cases/game/game.use-case';
import { loadGames, loadGamesSuccess, addGame } from '../actions/game.actions';

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private gameUseCase: GameUseCase
    ) { }

    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGames),
            mergeMap(() => this.gameUseCase.getGames().pipe(
                map(games => loadGamesSuccess({ games }))
            ))
        )
    );

    addGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addGame),
            mergeMap(action => this.gameUseCase.addGame(action.game).pipe(
                map(game => addGame({ game }))
            ))
        )
    );
}