import * as THREE from "three";
import Emit from "./Emit";
export default class Camera {
  constructor() {
    this.setInstance();
    Emit.Emitter.on(Emit.EmitEvent.SIZES, (e) => {
      this.SIZES(e);
    });
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera();
    this.instance.position.z = 5;
    this.fov = this.instance.fov * (Math.PI / 180);
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
    this.height = 2 * Math.tan(this.fov / 2) * this.instance.position.z;
    this.width = this.height * this.instance.aspect;
  }

  SIZES(e) {
    this.fov = this.instance.fov * (Math.PI / 180);
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
    this.height = 2 * Math.tan(this.fov / 2) * this.instance.position.z;
    this.width = this.height * this.instance.aspect;
  }
}
