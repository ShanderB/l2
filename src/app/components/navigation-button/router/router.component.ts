import { Component, Input } from "@angular/core";

@Component({
    selector: "app-router",
    templateUrl: "./router.component.html"
})
export class RouterComponent {
    @Input() route: string = "";
    @Input() text: string = "";
}