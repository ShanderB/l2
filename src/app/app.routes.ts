import { Routes } from '@angular/router';
import { GameFormComponent } from './components/game-form/game-form.component';
import { MainPageComponent } from './components/main/main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'add-game', component: GameFormComponent }
];
