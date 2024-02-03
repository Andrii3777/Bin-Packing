"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinalData = void 0;
const config_1 = __importDefault(require("../config"));
const util_1 = require("../util/util");
const algorithm1_1 = require("./algorithm1");
const algorithm2_1 = require("./algorithm2");
const fullness_1 = require("./fullness");
function getFinalData(jsonArray, algorithm) {
    let fullness = 1;
    const { containerWidth, containerHeight } = (0, util_1.getContainerData)();
    const initialBlocks = turnIfHeightGreaterThanWidth(jsonArray);
    let calculatedBlocks = calculatedFromInitial(initialBlocks);
    sortRectsByHeight(calculatedBlocks);
    if (algorithm === config_1.default.ALGORITHM_1) {
        (0, algorithm1_1.algorithm1)(containerWidth, containerHeight, calculatedBlocks);
    }
    if (algorithm === config_1.default.ALGORITHM_2) {
        const { matrix } = (0, algorithm2_1.algorithm2)(containerWidth, containerHeight, calculatedBlocks);
        fullness = (0, fullness_1.calculateFullness)(initialBlocks, matrix);
    }
    if (!areAllBlocksPacked(calculatedBlocks)) {
        return false;
    }
    const blockCoordinates = blockCoordinatesFromCalculated(calculatedBlocks, containerWidth, containerHeight);
    return { fullness, blockCoordinates };
}
exports.getFinalData = getFinalData;
function turnIfHeightGreaterThanWidth(blocks) {
    return blocks.map(({ width, height }) => ({
        width: width < height ? height : width,
        height: width < height ? width : height,
    }));
}
function sortRectsByHeight(blocks) {
    return blocks.sort((a, b) => b.h - a.h);
}
function calculatedFromInitial(initialBlocks) {
    return initialBlocks.map((block, index) => ({
        x: 0,
        y: 0,
        w: block.width,
        h: block.height,
        wasPacked: false,
        initialOrder: index,
    }));
}
function areAllBlocksPacked(blocks) {
    return blocks.every((block) => block.wasPacked === true);
}
function blockCoordinatesFromCalculated(toCalculateBlocks, containerWidth, containerHeight) {
    return toCalculateBlocks.map((block, index) => ({
        top: block.y,
        left: block.x,
        right: containerWidth - (block.x + block.w + 1),
        bottom: containerHeight - (block.y + block.h + 1),
        initialOrder: block.initialOrder,
    }));
}
//# sourceMappingURL=calculations.js.map