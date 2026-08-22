// ts-check
import { Vec3 } from "./vec3.js";


/**
 * @implements {ICoordNode}
 */
export class CoordNode {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} rotation
     * @param {CoordNode | null} parent
     */
    constructor(x, y, rotation, parent = null) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.parent = parent;
    }

    depth() {
        return this.pathToRoot().length
    }

    /** @type {ICoordNode['pathToRoot']} */
    pathToRoot() {
        /** @type {ICoordNode | null} */
        let current = this;
        const path = [];
        while (current != null) {
            path.push(current);
            current = current.parent;
        }
        return path;
    }

    // TODO: Handle null as base depth
    /** @type {ICoordNode['pathToNode']} */
    pathToNode(otherNode) {
        /** @type {ICoordNode | null} */
        let currA = this;
        /** @type {ICoordNode | null} */
        let currB = otherNode;

        const pathToInvert = [];
        const pathToApply = [];

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
                    pathToInvert.push(currA)
                    break
                } else {
                    addA = true;
                    addB = true;
                }
            }
            if (addA) {
                pathToInvert.push(currA)
                currA = currA.parent;
            }
            if (addB) {
             pathToApply.push(currB)
                currB = currB.parent;
            }
        }
        return {
            pathToInvert,
            pathToApply: pathToApply.reverse()
        }
    }
}


/** @implements {IVec2} */
export class Vec2 {

    /**
     * @param {*} x
     * @param {*} y
     * @param {*} coordinates
     */
    constructor(x, y, coordinates=null) {
        this.x = x;
        this.y = y;
        this.coordinates = coordinates;
    }

    /** @type IVec2['convert'] */
    convert(otherCoordinates=null) {
        const newVec = new Vec2(this.x, this.y, otherCoordinates);
        const { pathToInvert, pathToApply } = this.coordinates.pathToNode(otherCoordinates)
        // Order of Operations
        // Invert: Add Translations Add Rotate
        // Apply: Subtract Rotate Subtract Translations
        for (const coordsToInvert of pathToInvert) {
            // Complex numbers for rotation: (cos(45)x - ysin(45))  + i(xsin(45) + ycos(45))
            const rotation = coordsToInvert.rotation
            const { x, y } = newVec;
            newVec.x = (Math.cos(rotation) * x) - (y * Math.sin(rotation));
            newVec.y = (Math.sin(rotation) * x) + (y * Math.cos(rotation));

            newVec.x = newVec.x + coordsToInvert.x
            newVec.y = newVec.y + coordsToInvert.y
        }
        for (const coordsToApply of pathToApply) {
            newVec.x = newVec.x - coordsToApply.x
            newVec.y = newVec.y - coordsToApply.y

            const { x, y } = newVec;
            const rotation = -coordsToApply.rotation
            newVec.x = (Math.cos(rotation) * x) - (y * Math.sin(rotation));
            newVec.y = (Math.sin(rotation) * x) + (y * Math.cos(rotation));
        }
        return newVec
    }

}




const PI = Math.PI;
const TAU = 2*PI;
const canvas = /** @type {HTMLCanvasElement} */(document.getElementById('dog'))
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Base = new CoordNode(0, 0, 0, null);
// Rotated Coords
const Coord2 = new CoordNode(canvas.width/2, canvas.height/2, TAU/8, Base)
// const Coord2 = new CoordNode(canvas.width/2, canvas.height/2, 0, Base)
const Coord3 = new CoordNode(100, 0, 0, Coord2)
const Coord4 = new CoordNode(0, 0, TAU/8, Coord3)

// X Arrow

const moveToV = (v) => {
    const baseV = v.convert(Base)
    context?.moveTo(baseV.x, baseV.y)
}

const lineToV = (v) => {
    const baseV = v.convert(Base)
    context?.lineTo(baseV.x, baseV.y)
}

function drawArrow(c, color) {
    const arrowLength = 100;
    const arrowHeadLength = 30;
    const arrowBodyXStart = new Vec2(0, 0, c)
    const arrowBodyXEnd = new Vec2(arrowLength, 0, c)
    const arrowHeadDown = new Vec2(arrowLength-arrowHeadLength, arrowHeadLength, c)
    const arrowHeadUp = new Vec2(arrowLength-arrowHeadLength, -arrowHeadLength, c)
    context.beginPath()
        context.strokeStyle = color;
        moveToV(arrowBodyXStart)
        lineToV(arrowBodyXEnd)
        lineToV(arrowHeadDown)
        lineToV(arrowHeadUp)
        lineToV(arrowBodyXEnd)
    context?.stroke()
}

function draw() {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    drawArrow(Base, "red")
    drawArrow(Coord2, "green")
    drawArrow(Coord3, "orange")
    drawArrow(Coord4, "blue")
}

async function main() {
    while (true) {
        const time = await new Promise(requestAnimationFrame);
        Coord2.rotation += 0.01;
        draw()
    }
}

main()