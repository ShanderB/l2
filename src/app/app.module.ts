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
import { MainPageComponent } from './components/main/main-page.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { GameService } from './services/game-service';
import { GameCardComponent } from './components/game-card/game-card.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { RouterComponent } from './components/navigation-button/router/router.component';
import { ResultBoxComponent } from './components/game-card/result-box/result-box.component';
import { ErrorCardComponent } from './components/game-card/error-card/error-card.component';

@NgModule({
    declarations: [
        AppComponent,
        GameFormComponent,
        MainPageComponent,
        GameCardComponent,
        NavigationButtonComponent,
        RouterComponent,
        ResultBoxComponent,
        ErrorCardComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ game: gameReducer }),
        EffectsModule.forRoot([GameEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25 }),
        RouterModule.forRoot(routes)
    ],
    providers: [GameUseCase, GameEffects, GameService],
    bootstrap: [AppComponent],
    exports: [RouterModule]

})
export class AppModule { }