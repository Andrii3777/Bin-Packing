"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorithm1 = void 0;
function algorithm1(containerWidth, containerHeight, blocks) {
    let xPos = 0;
    let yPos = containerHeight; // Start packing from the bottom of the container
    let highestAtRow = 0;
    for (const block of blocks) {
        // if the block does`t fits in the current row
        if ((xPos + block.w) > containerWidth) {
            yPos -= highestAtRow; // Shift upwards by the highest block in the current row
            xPos = 0; // Start a new row with x=0
            highestAtRow = 0; // Reset the highest block in the current row
        }
        // if there is not enough space above to place the block
        if ((yPos - block.h) < 0) {
            break;
        }
        // Set new coordinates for the block
        block.x = xPos;
        block.y = yPos - block.h;
        xPos += block.w;
        // Update information about the tallest block in the current row
        if (block.h > highestAtRow) {
            highestAtRow = block.h;
        }
        block.wasPacked = true;
    }
    return blocks;
}
exports.algorithm1 = algorithm1;
//# sourceMappingURL=algorithm1.js.map