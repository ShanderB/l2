import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvailableBoxes } from '../../entities/available-boxes';
import { getBestBoxForDelivery } from '../../services/find-box-service';

@Component({
    selector: 'app-box-calculator',
    templateUrl: './box-calculator.component.html',
    // styleUrls: ['./box-calculator.component.css']
})
export class BoxCalculatorComponent {
    boxForm: FormGroup;
    availableBoxes: AvailableBoxes[] = [
        { height: 10, width: 10, length: 10 },
        { height: 20, width: 20, length: 20 },
        { height: 30, width: 30, length: 30 },
        { height: 40, width: 40, length: 40 },
        { height: 50, width: 50, length: 50 }
    ];

    constructor(private fb: FormBuilder) {
        this.boxForm = this.fb.group({
            deliveries: ['']
        });
    }

    onCalculate() {
        const deliveries = JSON.parse(this.boxForm.value.deliveries);
        const bestBoxes = getBestBoxForDelivery(deliveries, this.availableBoxes);
        console.log(bestBoxes);
    }
}