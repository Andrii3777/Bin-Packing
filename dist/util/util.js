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
//# sourceMappingURL=util.js.map