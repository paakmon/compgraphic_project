export interface ModelItem {
    _id: string;
    name: string;
    url: string;

    isVisible: boolean;

    isOutline: boolean;
    outLineThickness: number;
    outlineColor: string;

    transformation: {
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
    }
}