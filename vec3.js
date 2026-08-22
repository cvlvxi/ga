/// ts-check

import { Temp } from './temp.js';
import { Rotor3 } from './rotor3.js';

/** @implements {Vec3Type} */
export class Vec3 {

  /** @type {(typeof Vec3Type)['temp']} */
  static temp(x = 0, y = 0, z = 0) {
    return tempStorage.acquire().setXyz(x, y, z);
  }

  static singleton = new Vec3();
  static a = new Vec3();
  static b = new Vec3();
  static c = new Vec3();
  static d = new Vec3();

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  squareLength() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /** @type {Vec3Type['dot']} */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /** @type {Vec3Type['apply']} */
  apply(f) {
    f(this);
    return this;
  }

  /** @type {Vec3Type['set']} */
  set(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['set']} */
  static set(v) {
    return this.singleton.set(v);
  }

  setZero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
  }

  static zero() {
    return this.singleton.setZero();
  }

  setXyz(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  static xyz(x = 0, y = 0, z = 0) {
    return this.singleton.setXyz(x, y, z);
  }

  setX(x = 1) {
    this.x = x;
    this.y = 0;
    this.z = 0;
    return this;
  }

  static x(x = 1) {
    return this.singleton.setX(x);
  }

  setY(y = 1) {
    this.x = 0;
    this.y = y;
    this.z = 0;
    return this;
  }

  static y(y = 1) {
    return this.singleton.setY(y);
  }

  setZ(z = 1) {
    this.x = 0;
    this.y = 0;
    this.z = z;
    return this;
  }

  static z(z = 1) {
    return this.singleton.setZ(z);
  }

  /** @type {Vec3Type['setPolar']} */
  setPolar(angle, radius = 1) {
    this.x = Math.cos(angle) * radius;
    this.y = Math.sin(angle) * radius;
    this.z = 0;
    return this;
  }

  /** @type {(typeof Vec3Type)['polar']} */
  static polar(angle, radius = 1) {
    return this.singleton.setPolar(angle, radius);
  }

  /** @type {Vec3Type['setSpherical']} */
  setSpherical(angleXy, angleZ, radius = 1) {
    this.x = Math.cos(angleXy) * Math.sin(angleZ) * radius;
    this.y = Math.sin(angleXy) * Math.sin(angleZ) * radius;
    this.z = Math.cos(angleZ) * radius;
    return this;
  }

  /** @type {(typeof Vec3Type)['spherical']} */
  static spherical(angleXy, angleZ, radius = 1) {
    return this.singleton.setSpherical(angleXy, angleZ, radius);
  }

  /** @type {Vec3Type['setScale']} */
  setScale(k, v) {
    this.x = k * v.x;
    this.y = k * v.y;
    this.z = k * v.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['scale']} */
  static scale(k, v) {
    return this.singleton.setScale(k, v);
  }

  /** @type {Vec3Type['setScaleXyz']} */
  setScaleXyz(v, x = 1, y = 1, z = 1) {
    this.x = x * v.x;
    this.y = y * v.y;
    this.z = z * v.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['scaleXyz']} */
  static scaleXyz(v, x = 1, y = 1, z = 1) {
    return this.singleton.setScaleXyz(v, x, y, z);
  }


  /** @type {Vec3Type['setAdd']} */
  setAdd(va, vb) {
    this.x = va.x + vb.x;
    this.y = va.y + vb.y;
    this.z = va.z + vb.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['add']} */
  static add(va, vb) {
    return this.singleton.setAdd(va, vb);
  }

  /** @type {Vec3Type['setAddXyz']} */
  setAddXyz(v, x = 0, y = 0, z = 0) {
    this.x = v.x + x;
    this.y = v.y + y;
    this.z = v.z + z;
    return this;
  }

  /** @type {(typeof Vec3Type)['addXyz']} */
  static addXyz(v, x = 0, y = 0, z = 0) {
    return this.singleton.setAddXyz(v, x, y, z);
  }

  /** @type {Vec3Type['setScaleAdd']} */
  setScaleAdd(va, kb, vb) {
    this.x = va.x + kb * vb.x;
    this.y = va.y + kb * vb.y;
    this.z = va.z + kb * vb.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['scaleAdd']} */
  static scaleAdd(va, kb, vb) {
    return this.singleton.setScaleAdd(va, kb, vb);
  }

  /** @type {Vec3Type['setSum']} */
  setSum(ka, va, kb, vb) {
    this.x = ka * va.x + kb * vb.x;
    this.y = ka * va.y + kb * vb.y;
    this.z = ka * va.z + kb * vb.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['sum']} */
  static sum(ka, va, kb, vb) {
    return this.singleton.setSum(ka, va, kb, vb);
  }

  /** @type {Vec3Type['setDelta']} */
  setDelta(va, vb) {
    this.x = vb.x - va.x;
    this.y = vb.y - va.y;
    this.z = vb.z - va.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['delta']} */
  static delta(va, vb) {
    return this.singleton.setDelta(va, vb);
  }

  /** @type {Vec3Type['setSubtract']} */
  setSubtract(va, vb) {
    this.x = va.x - vb.x;
    this.y = va.y - vb.y;
    this.z = va.z - vb.z;
    return this;
  }

  /** @type {(typeof Vec3Type)['subtract']} */
  static subtract(va, vb) {
    return this.singleton.setSubtract(va, vb);
  }

  /** @type {Vec3Type['setLerp']} */
  setLerp(va, vb, t) {
    this.x = va.x + t * (vb.x - va.x);
    this.y = va.y + t * (vb.y - va.y);
    this.z = va.z + t * (vb.z - va.z);
    return this;
  }

  /** @type {(typeof Vec3Type)['lerp']} */
  static lerp(va, vb, t) {
    return this.singleton.setLerp(va, vb, t);
  }

  /** @type {Vec3Type['setNormalise']} */
  setNormalise(v) {
    const length = v.length();
    if (length === 0) {
      this.setXyz(0, 0, 0);
      return this;
    }
    this.x = v.x / length;
    this.y = v.y / length;
    this.z = v.z / length;
    return this;
  }

  /** @type {(typeof Vec3Type)['normalise']} */
  static normalise(v) {
    return this.singleton.setNormalise(v);
  }

  /** @type {Vec3Type['setMin']} */
  setMin(va, vb) {
    this.x = Math.min(va.x, vb.x);
    this.y = Math.min(va.y, vb.y);
    this.z = Math.min(va.z, vb.z);
    return this;
  }

  /** @type {(typeof Vec3Type)['min']} */
  static min(va, vb) {
    return this.singleton.setMin(va, vb);
  }

  /** @type {Vec3Type['setMax']} */
  setMax(va, vb) {
    this.x = Math.max(va.x, vb.x);
    this.y = Math.max(va.y, vb.y);
    this.z = Math.max(va.z, vb.z);
    return this;
  }

  /** @type {(typeof Vec3Type)['max']} */
  static max(va, vb) {
    return this.singleton.setMax(va, vb);
  }

  /** @type {Vec3Type['setMap']} */
  setMap(v, f) {
    this.x = f(v.x);
    this.y = f(v.y);
    this.z = f(v.z);
    return this;
  }

  /** @type {(typeof Vec3Type)['map']} */
  static map(v, f) {
    return this.singleton.setMap(v, f);
  }

  /** @type {Vec3Type['setYzx']} */
  setYzx(v) {
    const { x, y, z } = v;
    this.x = y;
    this.y = z;
    this.z = x;
    return this;
  }

  /** @type {(typeof Vec3Type)['setYzx']} */
  static setYzx(v) {
    return this.singleton.setYzx(v);
  }

  /** @type {Vec3Type['setRotateRotor3']} */
  setRotateRotor3(v, r) {
    initRotor3Statics?.();
    staticQungedRotation
      .setComponents(r.rr, -r.yz, -r.zx, -r.xy)
      .inplaceMultiplyRight(
        staticQungedPosition.setComponents(0, v.x, v.y, v.z)
      )
      .inplaceMultiplyRight(r);
    this.x = staticQungedRotation.yz;
    this.y = staticQungedRotation.zx;
    this.z = staticQungedRotation.xy;
    return this;
  }

  /** @type {(typeof Vec3Type)['rotateRotor3']} */
  static rotateRotor3(v, r) {
    return this.singleton.setRotateRotor3(v, r);
  }

  /** @type {Vec3Type['setMultiplyMat4Vec3']} */
  setMultiplyMat4Vec3(m, v) {
    return this.setXyz(
      m.aa * v.x + m.ab * v.y + m.ac * v.z + m.ad,
      m.ba * v.x + m.bb * v.y + m.bc * v.z + m.bd,
      m.ca * v.x + m.cb * v.y + m.cc * v.z + m.cd,
    );
  }

  /** @type {(typeof Vec3Type)['multiplyMat4Vec3']} */
  static multiplyMat4Vec3(m, v) {
    return this.singleton.setMultiplyMat4Vec3(m, v);
  }

  /** @type {Vec3Type['setNonParallel']} */
  setNonParallel(v) {
    [this.x, this.y, this.z] = [v.y, -v.z, v.x];
    return this;
  }

  /** @type {(typeof Vec3Type)['nonParallel']} */
  static nonParallel(v) {
    return this.singleton.setNonParallel(v);
  }

  /** @type {Vec3Type['setOrthogonal']} */
  setOrthogonal(normal) {
    staticOrthogonal.set(normal);
    return this
      .setNonParallel(staticOrthogonal)
      .inplaceNormalProjection(staticOrthogonal)
      .inplaceNormalise();
  }

  /** @type {(typeof Vec3Type)['orthogonal']} */
  static orthogonal(normal) {
    return this.singleton.setOrthogonal(normal);
  }

  /** @type {Vec3Type['setCross']} */
  setCross(va, vb) {
    // Matrix determinant method:
    //     [x y z]
    // det([a b c])
    //     [d e f]
    // = x(bf - ce) - y(af - cd) + z(ae - bd)

    // Geometric algebra method:
    // munge(nonscalar((ax + by + cz) * (dx + ey + fz)))
    // = munge(nonscalar(adxx + aexy + afxz + bdyx + beyy + bfyz + cdzx + cezy + cfzz))
    // = munge(aexy + afxz + bdyx + bfyz + cdzx + cezy)
    // = munge(aexy - afzx - bdxy + bfyz + cdzx - ceyz)
    // = aez - afy - bdz + bfx + cdy - cex
    // = x(bf - ce) + y(cd - af) + z(ae - bd)

    const { x: a, y: b, z: c } = va;
    const { x: d, y: e, z: f } = vb;
    this.x = b * f - c * e;
    this.y = c * d - a * f;
    this.z = a * e - b * d;
    return this;
  }

  /** @type {(typeof Vec3Type)['cross']} */
  static cross(va, vb) {
    return this.singleton.setCross(va, vb);
  }

  /** @type {Vec3Type['setTurnXy']} */
  setTurnXy(v) {
    return this.setXyz(-v.y, v.x, v.z);
  }

  /** @type {(typeof Vec3Type)['turnXy']} */
  static turnXy(v) {
    return this.singleton.setTurnXy(v);
  }

  /** @type {Vec3Type['setUnturnXy']} */
  setUnturnXy(v) {
    return this.setXyz(v.y, -v.x, v.z);
  }

  /** @type {(typeof Vec3Type)['unturnXy']} */
  static unturnXy(v) {
    return this.singleton.setUnturnXy(v);
  }

  /** @type {Vec3Type['setRotateXy']} */
  setRotateXy(v, r) {
    return this.setXyz(
      v.x * r.x - v.y * r.y,
      v.x * r.y + v.y * r.x,
      v.z,
    );
  }

  /** @type {(typeof Vec3Type)['setRotateXy']} */
  static setRotateXy(v, r) {
    return this.singleton.setRotateXy(v, r);
  }

  /** @type {Vec3Type['setRotateXyAngle']} */
  setRotateXyAngle(v, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return this.setXyz(
      v.x * cos - v.y * sin,
      v.x * sin + v.y * cos,
      v.z,
    );
  }

  /** @type {(typeof Vec3Type)['setRotateXyAngle']} */
  static setRotateXyAngle(v, angle) {
    return this.singleton.setRotateXyAngle(v, angle);
  }

  /** @type {Vec3Type['setTurnTowards']} */
  setTurnTowards(direction, position, destination, cosMaxTurnAngle) {
    staticDestinationDirection.setDelta(position, destination).inplaceNormalise();
    if (direction.dot(staticDestinationDirection) >= cosMaxTurnAngle) {
      return this.set(staticDestinationDirection);
    }
    staticOrthogonal
      .setNormalProjection(direction, staticDestinationDirection)
      .inplaceNormalise();
    return this.setSum(
      cosMaxTurnAngle,
      direction,
      Math.sqrt(1 - cosMaxTurnAngle ** 2),
      staticOrthogonal,
    ).inplaceNormalise();
  }

  /** @type {(typeof Vec3Type)['turnTowards']} */
  static turnTowards(direction, position, destination, cosMaxTurnAngle) {
    return this.singleton.setTurnTowards(direction, position, destination, cosMaxTurnAngle);
  }

  /** @type {Vec3Type['setFractionTowards']} */
  setFractionTowards(position, destination, fraction) {
    this.x = position.x + (destination.x - position.x) * fraction;
    this.y = position.y + (destination.y - position.y) * fraction;
    this.z = position.z + (destination.z - position.z) * fraction;
    return this;
  }

  /** @type {(typeof Vec3Type)['fractionTowards']} */
  static fractionTowards(position, destination, fraction) {
    return this.singleton.setFractionTowards(position, destination, fraction);
  }

  /** @type {Vec3Type['setNormalProjection']} */
  setNormalProjection(normal, v) {
    return this.setScaleAdd(v, -v.dot(normal), normal);
  }

  /** @type {(typeof Vec3Type)['normalProjection']} */
  static normalProjection(normal, v) {
    return this.singleton.setNormalProjection(normal, v);
  }

  /** @type {Vec3Type['setPlaneProjection']} */
  setPlaneProjection(planeOrigin, planeNormal, v) {
    return this
      .setRelativePlaneProjection(planeOrigin, planeNormal, v)
      .inplaceAdd(planeOrigin);
  }

  /** @type {(typeof Vec3Type)['planeProjection']} */
  static planeProjection(planeOrigin, planeNormal, v) {
    return this.singleton.setPlaneProjection(planeOrigin, planeNormal, v);
  }

  /** @type {Vec3Type['setRelativePlaneProjection']} */
  setRelativePlaneProjection(planeOrigin, planeNormal, position) {
    return this
      .setDelta(planeOrigin, position)
      .inplaceNormalProjection(planeNormal)
  }

  /** @type {(typeof Vec3Type)['relativePlaneProjection']} */
  static relativePlaneProjection(planeOrigin, planeNormal, position) {
    return this.singleton.setRelativePlaneProjection(planeOrigin, planeNormal, position);
  }

  /** @type {Vec3Type['setPlaneProjection2d']} */
  setPlaneProjection2d(planeBasis, v) {
    return this.setRelativePlaneProjection2d(planeBasis, this.setDelta(planeBasis.origin, v));
  }

  /** @type {(typeof Vec3Type)['planeProjection2d']} */
  static planeProjection2d(planeBasis, v) {
    return this.singleton.setPlaneProjection2d(planeBasis, v);
  }

  /** @type {Vec3Type['setRelativePlaneProjection2d']} */
  setRelativePlaneProjection2d(planeBasis, v) {
    return this.setXyz(planeBasis.xDirection.dot(v), planeBasis.yDirection.dot(v), 0);
  }

  /** @type {(typeof Vec3Type)['relativePlaneProjection2d']} */
  static relativePlaneProjection2d(planeBasis, v) {
    return this.singleton.setRelativePlaneProjection2d(planeBasis, v);
  }

  /** @type {Vec3Type['setPlanePosition3d']} */
  setPlanePosition3d(planeBasis, v) {
    return this.setRelativePlanePosition3d(planeBasis, v).inplaceAdd(planeBasis.origin);
  }

  /** @type {(typeof Vec3Type)['planePosition3d']} */
  static planePosition3d(planeBasis, v) {
    return this.singleton.setPlanePosition3d(planeBasis, v);
  }

  /** @type {Vec3Type['setRelativePlanePosition3d']} */
  setRelativePlanePosition3d(planeBasis, v) {
    return this.setSum(v.x, planeBasis.xDirection, v.y, planeBasis.yDirection);
  }

  /** @type {(typeof Vec3Type)['relativePlanePosition3d']} */
  static relativePlanePosition3d(planeBasis, v) {
    return this.singleton.setRelativePlanePosition3d(planeBasis, v);
  }

  /** @type {Vec3Type['inplaceScale']} */
  inplaceScale(k) { return this.setScale(k, this); }

  /** @type {Vec3Type['inplaceScaleXyz']} */
  inplaceScaleXyz(x = 1, y = 1, z = 1) { return this.setScaleXyz(this, x, y, z); }

  /** @type {Vec3Type['inplaceAdd']} */
  inplaceAdd(v) { return this.setAdd(this, v); }

  /** @type {Vec3Type['inplaceAddXyz']} */
  inplaceAddXyz(x = 0, y = 0, z = 0) { return this.setAddXyz(this, x, y, z); }

  /** @type {Vec3Type['inplaceScaleAdd']} */
  inplaceScaleAdd(k, v) { return this.setScaleAdd(this, k, v); }

  /** @type {Vec3Type['inplaceSum']} */
  inplaceSum(ka, kb, vb) { return this.setSum(ka, this, kb, vb); }

  /** @type {Vec3Type['inplaceDelta']} */
  inplaceDelta(v) { return this.setDelta(this, v); }

  /** @type {Vec3Type['inplaceSubtract']} */
  inplaceSubtract(v) { return this.setSubtract(this, v); }

  /** @type {Vec3Type['inplaceLerp']} */
  inplaceLerp(v, t) { return this.setLerp(this, v, t); }

  /** @type {Vec3Type['inplaceNormalise']} */
  inplaceNormalise() { return this.setNormalise(this); }

  /** @type {Vec3Type['inplaceMin']} */
  inplaceMin(v) { return this.setMin(this, v); }

  /** @type {Vec3Type['inplaceMax']} */
  inplaceMax(v) { return this.setMax(this, v); }

  /** @type {Vec3Type['inplaceMap']} */
  inplaceMap(f) { return this.setMap(this, f); }

  /** @type {Vec3Type['inplaceYzx']} */
  inplaceYzx() { return this.setYzx(this) }

  /** @type {Vec3Type['inplaceRotateRotor3']} */
  inplaceRotateRotor3(r) { return this.setRotateRotor3(this, r); }

  /** @type {Vec3Type['inplaceMultiplyMat4Left']} */
  inplaceMultiplyMat4Left(m) { return this.setMultiplyMat4Vec3(m, this); }

  /** @type {Vec3Type['inplaceNonParallel']} */
  inplaceNonParallel() { return this.setNonParallel(this); }

  /** @type {Vec3Type['inplaceOrthogonal']} */
  inplaceOrthogonal() { return this.setOrthogonal(this); }

  /** @type {Vec3Type['inplaceCross']} */
  inplaceCross(v) { return this.setCross(this, v); }

  /** @type {Vec3Type['inplaceTurnXy']} */
  inplaceTurnXy() { return this.setTurnXy(this); }

  /** @type {Vec3Type['inplaceUnturnXy']} */
  inplaceUnturnXy() { return this.setUnturnXy(this); }

  /** @type {Vec3Type['inplaceRotateXy']} */
  inplaceRotateXy(r) { return this.setRotateXy(this, r); }

  /** @type {Vec3Type['inplaceRotateXyAngle']} */
  inplaceRotateXyAngle(angle) { return this.setRotateXyAngle(this, angle); }

  /** @type {Vec3Type['inplaceTurnTowards']} */
  inplaceTurnTowards(position, destination, cosMaxTurnAngle) { return this.setTurnTowards(this, position, destination, cosMaxTurnAngle); }

  /** @type {Vec3Type['inplaceFractionTowards']} */
  inplaceFractionTowards(destination, fraction) { return this.setFractionTowards(this, destination, fraction); }

  /** @type {Vec3Type['inplaceNormalProjection']} */
  inplaceNormalProjection(normal) { return this.setNormalProjection(normal, this); }

  /** @type {Vec3Type['inplacePlaneProjection']} */
  inplacePlaneProjection(planeOrigin, planeNormal) { return this.setPlaneProjection(planeOrigin, planeNormal, this); }

  /** @type {Vec3Type['inplaceRelativePlaneProjection']} */
  inplaceRelativePlaneProjection(planeOrigin, planeNormal) { return this.setRelativePlaneProjection(planeOrigin, planeNormal, this); }

  /** @type {Vec3Type['inplacePlaneProjection2d']} */
  inplacePlaneProjection2d(planeBasis) { return this.setPlaneProjection2d(planeBasis, this); }

  /** @type {Vec3Type['inplaceRelativePlaneProjection2d']} */
  inplaceRelativePlaneProjection2d(planeBasis) { return this.setRelativePlaneProjection2d(planeBasis, this); }

  /** @type {Vec3Type['inplacePlanePosition3d']} */
  inplacePlanePosition3d(planeBasis) { return this.setPlanePosition3d(planeBasis, this); }

  /** @type {Vec3Type['inplaceRelativePlanePosition3d']} */
  inplaceRelativePlanePosition3d(planeBasis) { return this.setRelativePlanePosition3d(planeBasis, this); }
}

const tempStorage = Temp.registerStorage(() => new Vec3());

const staticOrthogonal = new Vec3();
const staticDestinationDirection = new Vec3();

/** @type {Rotor3} */
let staticQungedRotation;
/** @type {Rotor3} */
let staticQungedPosition;
/** @type {(() => void) | null} */
let initRotor3Statics = function () {
  initRotor3Statics = null;
  staticQungedRotation = new Rotor3();
  staticQungedPosition = new Rotor3();
};