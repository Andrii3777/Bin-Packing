import constants from "../config";
import { getContainerData } from "../util/util";
import { algorithm1 } from "./algorithm1";
import { algorithm2 } from "./algorithm2";
import { calculateFullness } from "./fullness";

export function getFinalData(jsonArray: InitialBlock[], algorithm: string)
    : RenderUIData | false {
    let fullness = 1;
    const { containerWidth, containerHeight } = getContainerData();
    const initialBlocks: InitialBlock[] = turnIfHeightGreaterThanWidth(jsonArray);
    let calculatedBlocks: CalculatedBlock[] = calculatedFromInitial(initialBlocks);

    sortRectsByHeight(calculatedBlocks);

    if (algorithm === constants.ALGORITHM_1) {
        algorithm1(containerWidth, containerHeight, calculatedBlocks);
    }
    if (algorithm === constants.ALGORITHM_2) {
        const { matrix } = algorithm2(
            containerWidth,
            containerHeight,
            calculatedBlocks
        );
        fullness = calculateFullness(initialBlocks, matrix);
    }

    if (!areAllBlocksPacked(calculatedBlocks)) {
        return false;
    }

    const blockCoordinates: BlockCoordinates[] = blockCoordinatesFromCalculated(
        calculatedBlocks,
        containerWidth,
        containerHeight
    );

    return { fullness, blockCoordinates };
}

function turnIfHeightGreaterThanWidth(blocks: InitialBlock[]): InitialBlock[] {
    return blocks.map(({ width, height }: InitialBlock) => ({
        width: width < height ? height : width,
        height: width < height ? width : height,
    }));
}

function sortRectsByHeight(blocks: CalculatedBlock[]): CalculatedBlock[] {
    return blocks.sort((a, b) => b.h - a.h);
}

function calculatedFromInitial(initialBlocks: InitialBlock[]): CalculatedBlock[] {
    return initialBlocks.map((block, index) => ({
        x: 0,
        y: 0,
        w: block.width,
        h: block.height,
        wasPacked: false,
        initialOrder: index,
    }));
}

function areAllBlocksPacked(blocks: CalculatedBlock[]): boolean {
    return blocks.every((block) => block.wasPacked === true);
}

function blockCoordinatesFromCalculated(
    toCalculateBlocks: CalculatedBlock[],
    containerWidth: number,
    containerHeight: number
): BlockCoordinates[] {
    return toCalculateBlocks.map((block, index) => ({
        top: block.y,
        left: block.x,
        right: containerWidth - (block.x + block.w + 1),
        bottom: containerHeight - (block.y + block.h + 1),
        initialOrder: block.initialOrder,
    }));
}
