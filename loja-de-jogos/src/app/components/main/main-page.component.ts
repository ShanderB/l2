import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { Game } from '../../entities/game';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    games: Game[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.games = this.gameService.getGames();
    }
}