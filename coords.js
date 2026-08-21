// ts-check

/**
 * @template T
 * @implements {TreeNodeType<T>}
 */
export class TreeNode {

    /**
     * @param {T} val
     * @param {TreeNodeType<T> | null} [parent=null]
     */
    constructor(val, parent = null) {
        this.val = val;
        this.parent = parent;
    }

    depth() {
        return this.pathToRoot().length
    }

    /** @type {TreeNodeType<T>['pathToRoot']} */
    pathToRoot() {
        /** @type {TreeNodeType<T> | null} */
        let current = this;
        const path = [];
        while (current != null) {
            path.push(current);
            current = current.parent;
        }
        return path;
    }

    /** @type {TreeNodeType<T>['pathToNode']} */
    pathToNode(otherNode) {
        /** @type {TreeNodeType<T> | null} */
        let currA = this;
        /** @type {TreeNodeType<T> | null} */
        let currB = otherNode;
        const pathA = [];
        const pathB = [];

        while (currA != null && currB != null) {
            let currADepth = currA.depth();
            let currBDepth = currB.depth();
            let addA = false;
            let addB = false;
            if (currADepth > currBDepth) {
                addA = true;
            } else if (currBDepth > currADepth) {
                addB = true;
            } else {
                // Found common ancestor
                if (currA === currB) {
                    pathA.push(currA)
                    break
                } else {
                    addA = true;
                    addB = true;
                }
            }
            if (addA) {
                pathA.push(currA)
                currA = currA.parent;
            }
            if (addB) {
                pathB.push(currB)
                currB = currB.parent;
            }
        }
        return pathA.concat(pathB.reverse())
    }
}


// Test
//                   0
//                1     2
//             3          7
//           4   5
//         6
//
const dogP = new TreeNode(0)
const dog1 = new TreeNode(1, dogP)
const dog2 = new TreeNode(2, dogP)
const dog3 = new TreeNode(3, dog1)
const dog4 = new TreeNode(4, dog3)
const dog5 = new TreeNode(5, dog3)
const dog6 = new TreeNode(6, dog4)
const dog7 = new TreeNode(7, dog2)
console.log('CHRIS: dogP', dogP);
console.log('CHRIS: dog1', dog1);
console.log('CHRIS: dog2', dog2);
console.log('CHRIS: dog4.depth()', dog4.depth());
console.log('CHRIS: dogP.depth()', dogP.depth());

console.log('CHRIS: dog6.pathToNode(dog5', dog6.pathToNode(dog5).map(x => x.val))
console.log('CHRIS: dog6.pathToNode(dog7', dog6.pathToNode(dog7).map(x => x.val))

