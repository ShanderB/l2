import { Component } from "@angular/core";
import { Game } from "../../entities/game";
import { BoxCalculatorService } from "../box-calculator/box-calculator.service";
import { AvailableBoxes } from "../../entities/available-boxes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GameService } from "../../services/game-service";


@Component({
    selector: "app-game-card",
    templateUrl: "./game-card.component.html"
})

export class GameCardComponent {
    selectedGames: string[] = [];
    errorMessage: string = "";
    games: Game[] = [];
    calculationResult: AvailableBoxes[] = [];
    gameForm: FormGroup;
    isSelectionMode: boolean = true;

    constructor(
        private readonly boxCalculator: BoxCalculatorService,
        private readonly fb: FormBuilder,
        private readonly gameService: GameService
    ) {
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

    toggleSelectionMode(): void {
        this.isSelectionMode = !this.isSelectionMode;
        /*     this.selectedGames = [];
            this.errorMessage = null;
            this.calculationResult = []; */
    }
}