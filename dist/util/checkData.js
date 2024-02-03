"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInitialData = void 0;
const util_1 = require("./util");
function checkInitialData(initialData) {
    if (isBlockAreaGreaterThanContainer(initialData)) {
        throw new Error('Total block area is greater than container!');
    }
    if (hasInappropriateData(initialData)) {
        throw new Error('Initial data has inappropriate value/values!');
    }
}
exports.checkInitialData = checkInitialData;
function isBlockAreaGreaterThanContainer(blocks) {
    const { containerWidth, containerHeight } = (0, util_1.getContainerData)();
    const containerArea = containerWidth * containerHeight;
    const totalBlocksArea = blocks.reduce((sum, block) => sum + block.width * block.height, 0);
    return totalBlocksArea > containerArea;
}
function hasInappropriateData(blocks) {
    for (const block of blocks) {
        if (!Number.isInteger(block.width) ||
            !Number.isInteger(block.height) ||
            block.width <= 0 ||
            block.height <= 0) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=checkData.js.map