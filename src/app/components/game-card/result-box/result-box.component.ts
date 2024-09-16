import { Component, Input } from "@angular/core";
import { AvailableBoxes } from "../../../entities/available-boxes";

@Component({
    selector: "app-result-box",
    templateUrl: "./result-box.component.html"
})
export class ResultBoxComponent {
    @Input() calculationResult: AvailableBoxes[] = [];


    constructor() { }
}