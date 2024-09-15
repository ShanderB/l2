import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GameUseCase } from '../../use-cases/game/game.use-case';
import { AvailableBoxes } from '../../entities/available-boxes';
import { Game } from '../../entities/game';

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html'
})
export class GameFormComponent {
    gameForm: FormGroup;
    message: string = '';

    constructor(private fb: FormBuilder, private gameUseCase: GameUseCase) {
        this.gameForm = this.fb.group({
            name: ['', Validators.required],
            price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            boxLength: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            boxWidth: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            boxHeight: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            description: [''],
            coverImage: [''],
        });
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
        if (this.validateForm()) {
            this.gameUseCase.addGame(this.gameForm.value).subscribe({
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