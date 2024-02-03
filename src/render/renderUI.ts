import constants from "../config";
import { getContainerData } from "../util/util";

const blocks: BlockData[] = [];
const { container } = getContainerData();

export function renderUI(data: RenderUIData | false): void {
    container.innerHTML = "";

    if (data) {
        renderBlocks(data.blockCoordinates);
        renderFullness(data.fullness);
    } else {
        renderAlert();
    }
}

function renderFullness(fullness: number): void {
    const fullnessDiv = document.createElement("div");
    fullnessDiv.textContent = "Fullness: " + fullness.toFixed(3);
    fullnessDiv.id = "fullnessDiv";
    container.appendChild(fullnessDiv);
}

function renderBlocks(blocks: BlockCoordinates[]): void {
    blocks.forEach((block: BlockCoordinates) => {
        const blockElement = createBlockElement(block);
        container.appendChild(blockElement);
    });
}

function createBlockElement(block: BlockCoordinates): HTMLElement {
    const { top, left, right, bottom, initialOrder } = block;
    const blockWidth = container.clientWidth - right - left;
    const blockHeight = container.clientHeight - top - bottom;
    const blockElement = document.createElement("div");

    blockElement.className = "block";
    blockElement.style.top = `${top}px`;
    blockElement.style.left = `${left}px`;
    blockElement.style.width = `${blockWidth}px`;
    blockElement.style.height = `${blockHeight}px`;
    blockElement.style.backgroundColor = getBlockColor(
        blockWidth,
        blockHeight,
        initialOrder
    );

    const orderLabel = document.createElement("span");
    orderLabel.textContent = initialOrder + "";
    blockElement.appendChild(orderLabel);

    return blockElement;
}

function getBlockColor(
    width: number,
    height: number,
    initialOrder: number
): string {
    let color;
    for (const obj of blocks) {
        if (
            (obj.width === width && obj.height === height) ||
            obj.initialOrder === initialOrder
        ) {
            color = obj.color;
        }
    }

    const newBlock: BlockData = {
        initialOrder,
        color: color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        width,
        height,
    };
    blocks.push(newBlock);

    return newBlock.color;
}

function renderAlert() {
    const alertDiv = document.createElement("div");
    alertDiv.textContent = constants.ALERT_MESSAGE;
    alertDiv.id = "alertDiv";
    container.appendChild(alertDiv);
}
