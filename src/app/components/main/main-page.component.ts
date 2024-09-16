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
export class MainPageComponent {
    constructor() { }
}