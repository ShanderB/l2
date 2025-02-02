import { createAction, props } from '@ngrx/store';
import { Game } from '../../entities/game';

export const addGame = createAction('[Game] Add Game', props<{ game: Game }>());
export const loadGames = createAction('[Game] Load Games');
export const loadGamesSuccess = createAction('[Game] Load Games Success', props<{ games: Game[] }>());