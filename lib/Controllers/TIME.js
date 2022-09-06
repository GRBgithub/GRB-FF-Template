import Emit from "../Utils/Emit";
import Stats from "stats.js";
import * as THREE from "three";
/*-----------------------------------------------------------
    FRAMES CONTROLLER EMIT A TIME DURATION & SHOW FPS IF #DEBUG
--------------------------------------------------------------*/
export default class TIME {
  constructor() {
    this.clock = new THREE.Clock();

    if (window.DEBUG) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom);
    }

    this.Tick();
  }

  Tick() {
    if (this.stats) this.stats.begin();
    this.elapsed = this.clock.getElapsedTime();
    Emit.Emitter.emit(Emit.EmitEvent.TIME, this.elapsed);

    window.requestAnimationFrame(() => {
      this.Tick();
    });
    if (this.stats) this.stats.end();
  }
}
