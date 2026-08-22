import { TreeNode, Vec3C } from '../coords.js'
import { CoordNode } from '../coords.js';

declare global {

    type Paths = {
        pathToInvert: TreeNodeType<T>[]
        pathToApply: TreeNodeType<T>[]
    }

    class ICoordNode {
        parent: ICoordNode | null;
        x: number;
        y: number;
        rotation: number
        constructor(x: number, y: number, rotation: number, parent?: T);
        depth(): number;
        // Find path to root
        pathToRoot(): TreeNodeType<T>[];
        // Find Path
        pathToNode(otherNode: TreeNodeType<T> | null): Paths
    }

    class IVec2 {
        x: number;
        y: number;
        coordinates: CoordNode;
        convert(otherCoordinates: CoordNode | null): IVec2;
        constructor(x?: number, y?: number, z?: number, coordinates: CoordNode | null);
    }
}

export {}