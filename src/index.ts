import { readJson } from "./util/util";
import { getFinalData } from "./algorithm/calculations";
import { renderUI } from "./render/renderUI";
import constants from "./config";
import { checkInitialData } from "./util/checkData";

(async () => {
    const initialData: InitialBlock[] = await readJson(constants.FILE_PATH);

    // Chose constants.ALGORITHM_1 OR constants.ALGORITHM_2
    const algorithm = constants.ALGORITHM_1;

    checkInitialData(initialData);
    renderUI(getFinalData(initialData, algorithm));

    window.addEventListener('resize', () => {
        renderUI(getFinalData(initialData, algorithm));
    });
})();