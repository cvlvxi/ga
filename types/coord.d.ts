import { TreeNode } from '../coords.js'

declare global {
    class TreeNodeType<T> {
        parent: TreeNodeType<T> | null;
        val: T

        constructor(val: T, parent?: T);

        depth(): number;

        // Find path to root
        pathToRoot(): TreeNodeType<T>[];

        // Find Path
        pathToNode(otherNode: TreeNodeType<T>): TreeNodeType<T>[];

    }
}

export { }