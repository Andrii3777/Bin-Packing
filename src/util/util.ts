export async function readJson(filePath: string): Promise<InitialBlock[]> {
    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error('Error occurred while fetching JSON: ' + response.statusText);
    }

    const data: InitialBlock[] = await response.json();

    return data;
}

export function getContainerData(): ContainerDimensions {
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