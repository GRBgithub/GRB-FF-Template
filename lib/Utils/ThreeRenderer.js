import * as THREE from "three";
import Emit from "./Emit";
export default class Renderer {
  constructor({ scene, camera, view, className, antialias = false, fullbox = false }) {
    this.view = view;
    this.camera = camera;
    this.className = className;
    this.scene = scene;
    this.antialias = antialias;
    this.fullbox = fullbox;
    this.pause = false;
    this.createRenderParam();
    this.createRender();
  }
  createRenderParam() {
    this.pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.AA = true;
    if (this.pixelRatio > 1) {
      this.AA = false;
    }
  }
  createRender() {
    this.instance = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    this.instance.shadowMap.enabled = false;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(window.innerWidth, window.innerHeight, this.fullbox);
    this.instance.setPixelRatio(this.pixelRatio);
    this.AppendDom();

    Emit.Emitter.on(Emit.EmitEvent.SIZES, (e) => {
      this.SIZES(e);
    });
    Emit.Emitter.on(Emit.EmitEvent.TIME, (e) => {
      this.TIME(e);
    });
  }
  AppendDom() {
    this.HTMLCANVAS = document.querySelector(this.view).appendChild(this.instance.domElement);
    this.HTMLCANVAS.classList.add(this.className);
  }
  SIZES(e) {
    this.instance.setSize(window.innerWidth, window.innerHeight, this.fullbox);
    this.instance.setPixelRatio(Math.min(e.pixelRatio, 1.5));
  }

  TIME(e) {
    if (this.pause || !this.instance) return;
    this.instance.render(this.scene, this.camera);
  }

  destroy() {
    // Traverse the whole scene
    this.instance.domElement.remove();
    this.instance.renderLists.dispose();
    this.instance.dispose();
    this.instance.context.getExtension("WEBGL_lose_context").loseContext();
    this.scene.traverse((child) => {
      // Test if it's a mesh

      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    for (var i = this.scene.children.length - 1; i >= 0; i--) {
      let obj = this.scene.children[i];
      this.scene.remove(obj);
    }
    this.instance = null;
  }
}
