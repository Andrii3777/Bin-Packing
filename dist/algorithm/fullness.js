"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFullness = void 0;
function calculateFullness(blocks, matrix) {
    const totalBlocksArea = blocks.reduce((sum, block) => sum + block.width * block.height, 0);
    // Change a container matrix, where we mark:
    // free pixcel (false) as 0, block pixel (true) as 1
    const numberMatrix = matrix.map((row) => row.map((value) => (value ? 1 : 0)));
    // Mark free outer pixels (that are not inner cavities) as 2
    const markedMatrix = markOuterFreePixelsAsTwo(numberMatrix);
    // Count inner free pixels marked as 0
    const innerCavityArea = countInnerFreePixels(markedMatrix);
    const fullness = 1 - innerCavityArea / (innerCavityArea + totalBlocksArea);
    return fullness;
}
exports.calculateFullness = calculateFullness;
function countInnerFreePixels(matrix) {
    let zeroCount = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                zeroCount++;
            }
        }
    }
    return zeroCount;
}
function markOuterFreePixelsAsTwo(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const stack = [];
    const directions = [
        [-1, 0], // Up
        [1, 0], // Down
        [0, -1], // Left
        [0, 1], // Right
    ];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            addToStackIfBorderZero(i, j, matrix, stack);
        }
    }
    while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop();
        matrix[currentRow][currentCol] = 2;
        processNeighbors(currentRow, currentCol, matrix, stack, directions);
    }
    return matrix;
}
function addToStackIfBorderZero(i, j, matrix, stack) {
    if ((i === 0 ||
        i === matrix.length - 1 ||
        j === 0 ||
        j === matrix[0].length - 1) &&
        matrix[i][j] === 0) {
        stack.push([i, j]);
    }
}
function processNeighbors(row, col, matrix, stack, directions) {
    for (const [di, dj] of directions) {
        const newRow = row + di;
        const newCol = col + dj;
        if (isInsideMatrix(newRow, newCol, matrix.length, matrix[0].length) &&
            matrix[newRow][newCol] === 0) {
            stack.push([newRow, newCol]);
        }
    }
}
function isInsideMatrix(i, j, rows, cols) {
    return i >= 0 && i < rows && j >= 0 && j < cols;
}
//# sourceMappingURL=fullness.js.map