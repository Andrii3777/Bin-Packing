export function algorithm2(containerWidth: number, containerHeight: number, blocks: CalculatedBlock[])
: { blocks: CalculatedBlock[]; matrix: boolean[][] } {
    // Сreate a container matrix, where we mark:
    // free pixcel as false, block pixel as true
    const containerMatrix: boolean[][] = Array.from(
        { length: containerHeight },
        () => Array(containerWidth).fill(false)
    );

    for (const block of blocks) {
        findOptimalPlacement(
            containerWidth,
            containerHeight,
            block,
            containerMatrix
        );
    }

    return { blocks, matrix: containerMatrix };
}

function findOptimalPlacement(
    containerWidth: number,
    containerHeight: number,
    block: CalculatedBlock,
    containerMatrix: boolean[][]
) {
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
                done = checkAvailabilityAndPackBlock(
                    done,
                    x,
                    y,
                    block,
                    containerMatrix
                );
            }
        }
    }
}

function checkAvailabilityAndPackBlock(
    done: boolean,
    x: number,
    y: number,
    block: CalculatedBlock,
    containerMatrix: boolean[][]
): boolean {
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

function markBlockPlacementAsTrue(
    containerMatrix: boolean[][],
    x: number,
    y: number,
    block: CalculatedBlock
): void {
    for (let iy = y; iy < y + block.h + 1; iy++) {
        for (let ix = x; ix < x + block.w + 1; ix++) {
            containerMatrix[iy][ix] = true;
        }
    }
}

function checkFreeSpaceForBlock(
    containerMatrix: boolean[][],
    x: number,
    y: number,
    blockWidth: number,
    blockHeight: number
): boolean {
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