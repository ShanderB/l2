import { AvailableBoxes } from "../entities/available-boxes";
import { Game } from "../entities/game";

export function getBestBoxForDelivery(deliveries: Game[][], availableBoxes: AvailableBoxes[]): (AvailableBoxes | AvailableBoxes[])[] {
    return deliveries.map(products => findBestBox(products, availableBoxes));
}

function findBestBox(products: Game[], availableBoxes: AvailableBoxes[]): AvailableBoxes | AvailableBoxes[] {
    let totalHeight = 0;
    let totalWidth = 0;
    let totalLength = 0;

    products.forEach(product => {
        totalHeight += product.boxHeight;
        totalWidth += product.boxWidth;
        totalLength += product.boxLength;
    });

    let bestBox: AvailableBoxes | null = null;
    availableBoxes.forEach(box => {
        if (box.height >= totalHeight && box.width >= totalWidth && box.length >= totalLength) {
            if (!bestBox || (box.height * box.width * box.length < bestBox.height * bestBox.width * bestBox.length)) {
                bestBox = box;
            }
        }
    });

    if (bestBox) {
        return bestBox;
    }

    return findMultipleBoxes(products, availableBoxes);
}

function findMultipleBoxes(products: Game[], availableBoxes: AvailableBoxes[]): AvailableBoxes[] {
    availableBoxes.sort((a, b) => (a.height * a.width * a.length) - (b.height * b.width * b.length));

    const usedBoxes: AvailableBoxes[] = [];

    products.forEach(product => {
        let boxFound = false;

        for (let box of availableBoxes) {
            if (box.height >= product.boxHeight && box.width >= product.boxWidth && box.length >= product.boxLength) {
                usedBoxes.push(box);
                boxFound = true;
                break;
            }
        }

        if (!boxFound) {
            throw new Error(`Não foi encontrado uma caixa capaz de acomodar o produto ${product.name}`);
        }
    });

    return usedBoxes;
}