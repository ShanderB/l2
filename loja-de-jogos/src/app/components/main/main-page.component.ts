import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { Game } from '../../entities/game';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    games: Game[] = [];
    gameForm: FormGroup;
    isSelectionMode: boolean = true;
    selectedGames: string[] = [];

    constructor(private readonly gameService: GameService, private readonly fb: FormBuilder) {
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
        this.games = this.gameService.getGames();
        this.populateGameForm();

    }

    toggleSelectionMode(): void {
        this.isSelectionMode = !this.isSelectionMode;
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

        console.log(this.selectedGames);

    }

    sendToBoxCalculator(): void {
        // const selectedGames = this.selectedGamesForm.value.selectedGames;
        // console.log('Dados enviados para a calculadora de caixa:', selectedGames);
        // Lógica para enviar os dados para a calculadora de caixa
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