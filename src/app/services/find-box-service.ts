import { AvailableBoxes } from "../entities/available-boxes";
import { Game } from "../entities/game";

export function getBestBoxForDelivery(games: Game[], availableBoxes: AvailableBoxes[]): AvailableBoxes[] {
    const selectedBoxes = [];
    const totalDimensions = games.reduce((acc, game) => {
        acc.height += game.boxHeight;
        acc.width += game.boxWidth;
        acc.length += game.boxLength;
        return acc;
    }, { height: 0, width: 0, length: 0 });

    let remainingDimensions = { ...totalDimensions };

    const largestBox = availableBoxes.reduce((prev, curr) =>
        (prev.height * prev.width * prev.length > curr.height * curr.width * curr.length) ? prev : curr
    );

    const largestGame = games.reduce((prev, curr) =>
        (prev.boxHeight * prev.boxWidth * prev.boxLength > curr.boxHeight * curr.boxWidth * curr.boxLength) ? prev : curr
    );

    if(largestBox.height < largestGame.boxHeight || largestBox.width < largestGame.boxWidth || largestBox.length < largestGame.boxLength){
        return [];
    }


    while (remainingDimensions.height > 0 || remainingDimensions.width > 0 || remainingDimensions.length > 0) {
        const box = availableBoxes.find(box =>
            box.height >= remainingDimensions.height &&
            box.width >= remainingDimensions.width &&
            box.length >= remainingDimensions.length
        );

        if (box) {
            selectedBoxes.push(box);
            remainingDimensions = { height: 0, width: 0, length: 0 };
        } else {
            selectedBoxes.push(largestBox);
            remainingDimensions.height -= largestBox.height;
            remainingDimensions.width -= largestBox.width;
            remainingDimensions.length -= largestBox.length;
        }
    }
    return selectedBoxes;
}