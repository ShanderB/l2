import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Game } from "../../../entities/game";
import { BoxCalculatorService } from "../../box-calculator/box-calculator.service";
import { AvailableBoxes } from "../../../entities/available-boxes";

@Component({
    selector: "app-finalize-button",
    templateUrl: "./finalize-button.component.html"
})
export class FinalizeButtonComponent {
    @Input() isSelectionMode: boolean = false;
    @Input() selectedGames: string[] = [];
    @Input() games: Game[] = [];
    @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();
    @Output() calculationResult: EventEmitter<AvailableBoxes[]> = new EventEmitter<AvailableBoxes[]>();

    constructor(
        private readonly boxCalculator: BoxCalculatorService,
    ) { }

    sendToBoxCalculator(): void {
        const selectedGames = this.selectedGames.map(gameId => {
            return this.games.find(g => g.id === gameId);
        }).filter(game => game !== undefined) as Game[];

        if (selectedGames.length === 0) {
            this.errorMessage.emit("Selecione algum jogo.");
            return;
        }

        const result = this.boxCalculator.onCalculate(selectedGames);

        if (result.length === 0) {
            this.errorMessage.emit("Existem jogos que não cabem nas caixas registradas.");
            return;
        }
        this.calculationResult.next(result);
    }
}
