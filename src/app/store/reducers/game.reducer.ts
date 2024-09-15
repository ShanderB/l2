import { createReducer, on } from '@ngrx/store';
import { addGame, loadGamesSuccess } from '../actions/game.actions';
import { Game } from '../../entities/game';

export interface GameState {
    games: Game[];
}

export const initialState: GameState = {
    games: []
};

export const gameReducer = createReducer(
    initialState,
    on(loadGamesSuccess, (state, { games }) => ({ ...state, games })),
    on(addGame, (state, { game }) => ({ ...state, games: [...state.games, game] }))
);