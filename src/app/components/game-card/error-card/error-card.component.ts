import { Component, Input } from "@angular/core";

@Component({
    selector: "app-error-card",
    templateUrl: "./error-card.component.html"
})
export class ErrorCardComponent {
    @Input() errorMessage: string = "";

    constructor() { }
}