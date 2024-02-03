"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJson = void 0;
async function readJson(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error('Error occurred while fetching JSON: ' + response.statusText);
    }
    const data = await response.json();
    return data;
}
exports.readJson = readJson;
//# sourceMappingURL=readJson.js.map