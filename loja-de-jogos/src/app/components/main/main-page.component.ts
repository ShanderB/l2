import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game-service';
import { Game } from '../../entities/game';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoxCalculatorService } from '../box-calculator/box-calculator.service';
import { AvailableBoxes } from '../../entities/available-boxes';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
    games: Game[] = [];
    gameForm: FormGroup;
    isSelectionMode: boolean = true;
    selectedGames: string[] = [];
    errorMessage: string | null = null;
    calculationResult: AvailableBoxes[] = [];

    constructor(private readonly gameService: GameService, private readonly fb: FormBuilder, private readonly boxCalculator: BoxCalculatorService) {
        this.gameForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            price: ['', Validators.required],
            boxLength: ['', Validators.required],
            boxWidth: ['', Validators.required],
            boxHeight: ['', Validators.required],
            description: [''],
            coverImage: [''],
        });
    }

    ngOnInit(): void {
        this.gameService.getAllGames().subscribe(games => {
            this.games = games;
            this.populateGameForm();
        });
    }

    toggleSelectionMode(): void {
        this.isSelectionMode = !this.isSelectionMode;
        this.selectedGames = [];
        this.errorMessage = null;
        this.calculationResult = [];
    }

    onCheckboxChange(game: Game, event: Event): void {

        const inputElement = (event.target as HTMLInputElement)
        const isChecked = inputElement.checked;

        if (isChecked) {
            this.selectedGames.push(game.id!)
        } else {
            const index = this.selectedGames.findIndex(x => x === game.id);
            this.selectedGames.splice(index, 1);
        }
    }

    sendToBoxCalculator(): void {
        const selectedGames = this.selectedGames.map(gameId => {
            return this.games.find(g => g.id === gameId);
        }).filter(game => game !== undefined) as Game[];

        if (selectedGames.length === 0) {
            this.errorMessage = "Selecione algum jogo.";
            return;
        }

        const result = this.boxCalculator.onCalculate(selectedGames);

        if (result.length === 0) {
            this.errorMessage = "Existem jogos que não cabem nas caixas registradas.";
            return;
        }
        this.calculationResult = result;
    }

    populateGameForm(): void {
        this.games.forEach(game => {
            this.gameForm.patchValue({
                id: game.id,
                name: game.name,
                price: game.price,
                boxLength: game.boxLength,
                boxWidth: game.boxWidth,
                boxHeight: game.boxHeight,
                description: game.description,
                coverImage: game.coverImage,
            });
        });
    }
}