import { getContainerData } from "./util";

export function checkInitialData(initialData: InitialBlock[]) {
    if (isBlockAreaGreaterThanContainer(initialData)) {
        throw new Error('Total block area is greater than container!');
    }
    if (hasInappropriateData(initialData)) {
        throw new Error('Initial data has inappropriate value/values!');
    }
}

function isBlockAreaGreaterThanContainer(blocks: InitialBlock[]): boolean {
    const { containerWidth, containerHeight } = getContainerData();
    const containerArea = containerWidth * containerHeight;
    const totalBlocksArea = blocks.reduce((sum, block) => sum + block.width * block.height, 0);

    return totalBlocksArea > containerArea;
}

function hasInappropriateData(blocks: InitialBlock[]): boolean {
    for (const block of blocks) {
        if (
            !Number.isInteger(block.width) ||
            !Number.isInteger(block.height) ||
            block.width <= 0 ||
            block.height <= 0
        ) {
            return true;
        }
    }
    return false;
}
