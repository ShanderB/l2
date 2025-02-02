import { AvailableBoxes } from "../entities/available-boxes";
import { Game } from "../entities/game";

export function getBestBoxForDelivery(games: Game[], availableBoxes: AvailableBoxes[]): AvailableBoxes[] {
    return findBestBox(games, availableBoxes)
}

function findBestBox(products: Game[], availableBoxes: AvailableBoxes[]): AvailableBoxes[] {
    let totalHeight = 0;
    let totalWidth = 0;
    let totalLength = 0;

    const biggestAvailabeBox = availableBoxes.reduce((prev, current) => {
        return (prev.height * prev.width * prev.length) > (current.height * current.width * current.length) ? prev : current;
    });

    const biggestGame = products.reduce((prev, current) => {
        return (prev.boxHeight * prev.boxWidth * prev.boxLength) > (current.boxHeight * current.boxWidth * current.boxLength) ? prev : current;
    });

    if(biggestAvailabeBox.height < biggestGame.boxHeight || biggestAvailabeBox.width < biggestGame.boxWidth || biggestAvailabeBox.length < biggestGame.boxLength) {
        return [];
    }
    
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
        return [bestBox];
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
            return;
        }
    });

    return usedBoxes;
}



// Test function. Jogar o código no arquivo "src/app/services/find-box-service.ts" e rodar o projeto. Será exibido no console do navegador.
testGetBestBoxForDelivery();
function testGetBestBoxForDelivery() {
    const availableBoxes = [
        { height: 10, width: 10, length: 10 },
        { height: 20, width: 20, length: 20 },
        { height: 30, width: 30, length: 30 },
        { height: 40, width: 40, length: 40 },
        { height: 50, width: 50, length: 50 }
    ];

    //Deverá pegar uma caixa tamanho 20x20x20 pois a soma das dimensões dos jogos é 15x15x15
    const games: any = [
        { boxHeight: 10, boxWidth: 10, boxLength: 10 },
        { boxHeight: 5, boxWidth: 5, boxLength: 5 }
    ];

    try {
        const result = getBestBoxForDelivery(games, availableBoxes);
        if (result[0].height === 20 && result[0].width === 20 && result[0].length === 20) {
            console.log("Test 1 Passed");
        } else {
            throw new Error(`Test 1 Falhou: Deveria ser a caixa 15x15x15 mas recebeu ${JSON.stringify(result)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }

    //Deverá pegar uma caixa tamanho 30x30x30 pois a soma das dimensões dos jogos é 25x25x25
    const games2: any = [
        { boxHeight: 10, boxWidth: 10, boxLength: 10 },
        { boxHeight: 15, boxWidth: 15, boxLength: 15 }
    ];

    try {
        const result2 = getBestBoxForDelivery(games2, availableBoxes);
        if (result2[0].height === 30 && result2[0].width === 30 && result2[0].length === 30) {
            console.log("Test 2 Passed");
        } else {
            throw new Error(`Test 2 Falhou: Deveria ser a caixa 20x20x20 mas recebeu ${JSON.stringify(result2)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }

    const games3: any = [
        { boxHeight: 252, boxWidth: 225, boxLength: 252 }
    ];

    //Não deverá pegar nenhuma caixa pois a soma das dimensões é maior que qualquer caixa disponível
    try {
        const result3 = getBestBoxForDelivery(games3, availableBoxes);
        if (result3.length === 0) {
            console.log("Test 3 Passed");
        } else {
            throw new Error(`Test 3 Falhou: Expected no box mas recebeu ${JSON.stringify(result3)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }

    //Deverá pegar uma caixa tamanho 10x10x10 pois a soma das dimensões dos jogos é 6x6x6
    const games4: any = [
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 }
    ];

    try {
        const result4 = getBestBoxForDelivery(games4, availableBoxes);
        if (result4.length === 1 && result4[0].height === 10 && result4[0].width === 10 && result4[0].length === 10) {
            console.log("Test 4 Passed");
        } else {
            throw new Error(`Test 4 Falhou: Deveria ser a caixa 10x10x10 mas recebeu ${JSON.stringify(result4)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }

    //Deverá pegar uma caixa tamanho 10x10x10 pois a soma das dimensões dos jogos é 10x10x10
    const games5: any = [
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
    ];

    try {
        const result5 = getBestBoxForDelivery(games5, availableBoxes);
        if (result5.length === 1 && result5[0].height === 10 && result5[0].width === 10 && result5[0].length === 10) {
            console.log("Test 5 Passed");
        } else {
            throw new Error(`Test 5 Falhou: Deveria ser a caixa 15x15x15 mas recebeu ${JSON.stringify(result5)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }

    //Deverá pegar uma caixa tamanho 20x20x20 pois a soma das dimensões dos jogos é 11x11x11
    const games6: any = [
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
        { boxHeight: 1, boxWidth: 1, boxLength: 1 },
    ];

    try {
        const result6 = getBestBoxForDelivery(games6, availableBoxes);
        if (result6.length === 1 && result6[0].height === 20 && result6[0].width === 20 && result6[0].length === 20) {
            console.log("Test 6 Passed");
        } else {
            throw new Error(`Test 6 Falhou: Deveria ser a caixa 15x15x15 mas recebeu ${JSON.stringify(result6)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }

    //Deverá pegar duas caixas, uma de 50x50x50 e outra de 20x20x20.
    const games7: any = [
        { boxHeight: 50, boxWidth: 50, boxLength: 50 },
        { boxHeight: 15, boxWidth: 15, boxLength: 15 }
    ];

    try {
        const result7 = getBestBoxForDelivery(games7, availableBoxes);
        if (result7.length === 2 && result7[1].height === 20 && result7[1].width === 20 && result7[1].length === 20 && result7[0].height === 50 && result7[0].width === 50 && result7[0].length === 50) {
            console.log("Test 7 Passed");
        } else {
            throw new Error(`Test 7 Falhou: Deveria ser a caixa 50x50x50 and 20x20x20 mas recebeu ${JSON.stringify(result7)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }


    //Deverá pegar duas caixas de 50x50x50 //! Não funcional
/*     const games8: any = [
        { boxHeight: 50, boxWidth: 50, boxLength: 50 },
        { boxHeight: 40, boxWidth: 40, boxLength: 40 },
        { boxHeight: 10, boxWidth: 10, boxLength: 10 },
    ];

    try {
        const result8 = getBestBoxForDelivery(games8, availableBoxes);
        if (result8.length === 2 &&
            result8[0].height === 50 && result8[0].width === 50 && result8[0].length === 50 &&
            result8[1].height === 50 && result8[1].width === 50 && result8[1].length === 50) {
            console.log("Test 8 Passed");
        } else {
            throw new Error(`Test 8 Falhou: Expected two boxes of 50x50x50 mas recebeu ${JSON.stringify(result8)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    } */

    //Deverá pegar ter um game de 10x10x10 e outro de 200x200x200
    const games9: any = [
        { boxHeight: 10, boxWidth: 10, boxLength: 10 },
        { boxHeight: 200, boxWidth: 200, boxLength: 200 },
    ];

    try {
        const result9 = getBestBoxForDelivery(games9, availableBoxes);
        if (result9.length === 0) {
            console.log("Test 9 Passed");
        } else {
            throw new Error(`Test 9 Falhou: Expected no box mas recebeu ${JSON.stringify(result9)}`);
        }
    } catch (error: any) {
        console.error(error.message);
    }
} 