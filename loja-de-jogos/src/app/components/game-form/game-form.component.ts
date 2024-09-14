import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameUseCase } from '../../use-cases/game/game.use-case';

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html',
    // styleUrls: ['./game-form.component.css']
})
export class GameFormComponent {
    gameForm: FormGroup;

    constructor(private fb: FormBuilder, private gameUseCase: GameUseCase) {
        this.gameForm = this.fb.group({
            name: [''],
            price: [''],
            boxSize: [''],
            description: [''],
            coverImage: ['']
        });
    }

    onSubmit() {
        this.gameUseCase.addGame(this.gameForm.value).subscribe();
    }
}