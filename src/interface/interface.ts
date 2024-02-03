interface RenderUIData {
    fullness: number;
    blockCoordinates: BlockCoordinates[];
}

interface BlockCoordinates {
    top: number;
    left: number;
    right: number;
    bottom: number;
    initialOrder: number;
}

interface InitialBlock {
    width: number;
    height: number;
}

interface ContainerDimensions {
    container: HTMLElement;
    containerWidth: number;
    containerHeight: number;
}

interface CalculatedBlock {
    x: number;
    y: number;
    w: number;
    h: number;
    wasPacked: boolean;
    initialOrder: number;
}

interface BlockData {
    color: string;
    width: number;
    height: number;
    initialOrder: number;
}