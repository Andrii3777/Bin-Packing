"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderUI = void 0;
const config_1 = __importDefault(require("../config"));
const util_1 = require("../util/util");
const blocks = [];
const { container } = (0, util_1.getContainerData)();
function renderUI(data) {
    container.innerHTML = "";
    if (data) {
        renderBlocks(data.blockCoordinates);
        renderFullness(data.fullness);
    }
    else {
        renderAlert();
    }
}
exports.renderUI = renderUI;
function renderFullness(fullness) {
    const fullnessDiv = document.createElement("div");
    fullnessDiv.textContent = "Fullness: " + fullness.toFixed(3);
    fullnessDiv.id = "fullnessDiv";
    container.appendChild(fullnessDiv);
}
function renderBlocks(blocks) {
    blocks.forEach((block) => {
        const blockElement = createBlockElement(block);
        container.appendChild(blockElement);
    });
}
function createBlockElement(block) {
    const { top, left, right, bottom, initialOrder } = block;
    const blockWidth = container.clientWidth - right - left;
    const blockHeight = container.clientHeight - top - bottom;
    const blockElement = document.createElement("div");
    blockElement.className = "block";
    blockElement.style.top = `${top}px`;
    blockElement.style.left = `${left}px`;
    blockElement.style.width = `${blockWidth}px`;
    blockElement.style.height = `${blockHeight}px`;
    blockElement.style.backgroundColor = getBlockColor(blockWidth, blockHeight, initialOrder);
    const orderLabel = document.createElement("span");
    orderLabel.textContent = initialOrder + "";
    blockElement.appendChild(orderLabel);
    return blockElement;
}
function getBlockColor(width, height, initialOrder) {
    let color;
    for (const obj of blocks) {
        if ((obj.width === width && obj.height === height) ||
            obj.initialOrder === initialOrder) {
            color = obj.color;
        }
    }
    const newBlock = {
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
    alertDiv.textContent = config_1.default.ALERT_MESSAGE;
    alertDiv.id = "alertDiv";
    container.appendChild(alertDiv);
}
//# sourceMappingURL=renderUI.js.map