import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GameUseCase } from '../../use-cases/game/game.use-case';
import { AvailableBoxes } from '../../entities/available-boxes';
import { Game, GameFormControls } from '../../entities/game';

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html'
})
export class GameFormComponent {
    gameForm: FormGroup<GameFormControls>;
    message: string = '';

    constructor(private fb: FormBuilder, private gameUseCase: GameUseCase) {
        this.gameForm = this.fb.group({
            name: new FormControl<string>('', Validators.required),
            price: new FormControl<number>(1, [Validators.required, Validators.pattern('^[0-9]*$')]),
            boxLength: new FormControl<number>(1, [Validators.required, Validators.pattern('^[0-9]*$')]),
            boxWidth: new FormControl<number>(1, [Validators.required, Validators.pattern('^[0-9]*$')]),
            boxHeight: new FormControl<number>(1, [Validators.required, Validators.pattern('^[0-9]*$')]),
            description: new FormControl<string>(''),
            coverImage: new FormControl<string>(''),
        }) as FormGroup<GameFormControls>;
    }

    validateForm(): boolean {
        if (this.gameForm.invalid) {
            this.message = 'Por favor, preencha todos os campos corretamente.';
            return false;
        }
        this.message = '';
        return true;
    }

    onSubmit() {
        const game = {
            name: this.gameForm.value.name,
            price: this.gameForm.value.price,
            boxLength: this.gameForm.value.boxLength,
            boxWidth: this.gameForm.value.boxWidth,
            boxHeight: this.gameForm.value.boxHeight,
            description: this.gameForm.value.description,
            coverImage: this.gameForm.value.coverImage
        } as Game;

        if (this.validateForm()) {
            this.gameUseCase.addGame(game).subscribe({
                next: () => {
                    this.message = 'Usuário cadastrado com sucesso!';
                },
                error: () => {
                    this.message = 'Erro ao cadastrar o usuário. Preencha corretamente os campos.';
                }
            });
        }
    }

    validateNumber(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '');
        if (input.value.startsWith('-')) {
            input.value = input.value.substring(1);
        }
    }
}