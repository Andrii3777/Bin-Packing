(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algorithm2 = void 0;
function algorithm2(containerWidth, containerHeight, blocks) {
    // Сreate a container matrix, where we mark:
    // free pixcel as false, block pixel as true
    const containerMatrix = Array.from({ length: containerHeight }, () => Array(containerWidth).fill(false));
    for (const block of blocks) {
        findOptimalPlacement(containerWidth, containerHeight, block, containerMatrix);
    }
    return { blocks, matrix: containerMatrix };
}
exports.algorithm2 = algorithm2;
function findOptimalPlacement(containerWidth, containerHeight, block, containerMatrix) {
    let done = false;
    for (let y = containerHeight - block.h; y >= 0 && !done; y--) {
        for (let x = containerWidth - block.w; x >= 0 && !done; x--) {
            // Make sure this rectangle doesn't go over the edge of the boundary
            if (y + block.h >= containerHeight || x + block.w >= containerWidth) {
                continue;
            }
            // Found a location!
            // For every coordinate, check top right and bottom left
            if (!containerMatrix[y][x] &&
                !containerMatrix[y + block.h][x + block.w]) {
                // Corners of image are free
                // If valid, check all pixels inside that rect
                done = checkAvailabilityAndPackBlock(done, x, y, block, containerMatrix);
            }
        }
    }
}
function checkAvailabilityAndPackBlock(done, x, y, block, containerMatrix) {
    let valid = checkFreeSpaceForBlock(containerMatrix, x, y, block.w, block.h);
    // If valid, we've found a location
    if (valid) {
        block.x = x;
        block.y = y;
        done = true;
        // Set the used pixels to true so we don't overlap them
        markBlockPlacementAsTrue(containerMatrix, x, y, block);
        block.wasPacked = true;
    }
    return done;
}
function markBlockPlacementAsTrue(containerMatrix, x, y, block) {
    for (let iy = y; iy < y + block.h + 1; iy++) {
        for (let ix = x; ix < x + block.w + 1; ix++) {
            containerMatrix[iy][ix] = true;
        }
    }
}
function checkFreeSpaceForBlock(containerMatrix, x, y, blockWidth, blockHeight) {
    let valid = true;
    for (let iy = y; iy < y + blockHeight; iy++) {
        for (let ix = x; ix < x + blockWidth; ix++) {
            if (containerMatrix[iy][ix]) {
                valid = false;
                break;
            }
        }
    }
    return valid;
}

},{}],3:[function(require,module,exports){
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

},{"../config":5,"../util/util":9,"./algorithm1":1,"./algorithm2":2,"./fullness":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    FILE_PATH: './files/test3.json',
    ALGORITHM_1: 'Fast algorithm',
    ALGORITHM_2: 'Tight algorithm',
    ALERT_MESSAGE: "TOO MUCH BLOCKS FOR THIS ALGORITHM",
};
exports.default = constants;

},{}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util/util");
const calculations_1 = require("./algorithm/calculations");
const renderUI_1 = require("./render/renderUI");
const config_1 = __importDefault(require("./config"));
const checkData_1 = require("./util/checkData");
(async () => {
    const initialData = await (0, util_1.readJson)(config_1.default.FILE_PATH);
    // Chose constants.ALGORITHM_1 OR constants.ALGORITHM_2
    const algorithm = config_1.default.ALGORITHM_1;
    (0, checkData_1.checkInitialData)(initialData);
    (0, renderUI_1.renderUI)((0, calculations_1.getFinalData)(initialData, algorithm));
    window.addEventListener('resize', () => {
        (0, renderUI_1.renderUI)((0, calculations_1.getFinalData)(initialData, algorithm));
    });
})();

},{"./algorithm/calculations":3,"./config":5,"./render/renderUI":7,"./util/checkData":8,"./util/util":9}],7:[function(require,module,exports){
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

},{"../config":5,"../util/util":9}],8:[function(require,module,exports){
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

},{"./util":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainerData = exports.readJson = void 0;
async function readJson(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error('Error occurred while fetching JSON: ' + response.statusText);
    }
    const data = await response.json();
    return data;
}
exports.readJson = readJson;
function getContainerData() {
    const container = document.getElementById('container');
    // OR
    //const container = document.getElementById('container') as HTMLElement;
    if (!container) {
        throw new Error('Container element not found!');
    }
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    return { container, containerWidth, containerHeight };
}
exports.getContainerData = getContainerData;

},{}]},{},[6]);
