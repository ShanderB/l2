import { Component, Input } from "@angular/core";

@Component({
    selector: "app-navigation-button",
    templateUrl: "./navigation-button.component.html"
})
export class NavigationButtonComponent {
    @Input() route: string = "";
    @Input() text: string = "";
}