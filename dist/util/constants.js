"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainerData = void 0;
function getContainerData() {
    const container = document.getElementById('container');
    if (!container) {
        throw new Error('Container element not found!');
    }
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    return { container, containerWidth, containerHeight };
}
exports.getContainerData = getContainerData;
//# sourceMappingURL=constants.js.map