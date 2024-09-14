import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameUseCase } from '../../use-cases/game/game.use-case';
import { addGame, loadGames, loadGamesSuccess } from '../actions/game.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class GameEffects {
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

    constructor(
        private actions$: Actions,
        private gameUseCase: GameUseCase
    ) { }
}