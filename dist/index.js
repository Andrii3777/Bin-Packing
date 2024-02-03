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
//# sourceMappingURL=index.js.map