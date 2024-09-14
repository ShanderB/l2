import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { gameReducer } from './store/reducers/game.reducer';
import { GameEffects } from './store/effects/game.effects';
import { GameUseCase } from './use-cases/game/game.use-case';

@NgModule({
    declarations: [
        AppComponent,
        GameFormComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ game: gameReducer }),
        EffectsModule.forRoot([GameEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
    providers: [GameUseCase],
    bootstrap: [AppComponent]
})
export class AppModule { }