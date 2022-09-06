import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GSAP from "gsap";
import Emit from "../../lib/Utils/Emit";
export default class Galaxy {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.initAction = false;
    this.center = new THREE.Vector3();
    this.Parameters = {
      color: "black",
      count: 200000,
      size: 0.01,
      radius: 5,
      branches: 5,
      spin: 0.8,
      randomness: 1.1,
      randomnessPower: 4.9,
      hole: 0.4,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
      CameraPos: false,
      GenerateMode: () => {
        this.modeDebug.innerHTML = `
        this.Parameters.count = ${this.Parameters.count};
        this.Parameters.size = ${this.Parameters.size};
        this.Parameters.radius = ${this.Parameters.radius};
        this.Parameters.branches = ${this.Parameters.branches};
        this.Parameters.spin = ${this.Parameters.spin};
        this.Parameters.randomness = ${this.Parameters.randomness};
        this.Parameters.randomnessPower = ${this.Parameters.randomnessPower};
        this.Parameters.hole = ${this.Parameters.hole};
        this.camera.instance.position.x = ${this.camera.instance.position.x.toFixed(2)};
        this.camera.instance.position.y = ${this.camera.instance.position.y.toFixed(2)};
        this.camera.instance.position.z = ${this.camera.instance.position.z.toFixed(2)};
        this.camera.instance.rotation.x =${this.camera.instance.rotation.x.toFixed(2)};
        this.camera.instance.rotation.y = ${this.camera.instance.rotation.y.toFixed(2)};
        this.camera.instance.rotation.z = ${this.camera.instance.rotation.z.toFixed(2)};
      `;
      },
    };
    this.geometry = null;
    this.material = null;
    this.points = null;
    this.group = new THREE.Group();
    this.group.name = "Galaxy";

    this.init = false;
    this.modestate = 0;
    this.debug();
  }
  setDebug() {}
  Init() {
    this.cameraDebug = document.querySelector(".camera__debug");
    this.modeDebug = document.querySelector(".mode__debug");

    this.camera.instance.position.z = 3;
    this.camera.instance.position.y = 2;
    // this.controls = new OrbitControls(this.camera.instance, this.renderer.instance.domElement);
    // this.controls.enableDamping = true;
    // this.controls.minDistance = 1;
    // this.controls.maxDistance = 15;
    // this.controls.enablePan = false;

    this.SIZES();
    this.create();
    this.init = true;
  }
  create() {
    const insideColor = new THREE.Color(this.Parameters.insideColor);
    const outsideColor = new THREE.Color(this.Parameters.outsideColor);
    if (this.points != null) {
      this.geometry.dispose();
      this.material.dispose();
      this.group.remove(this.points);
    }
    /**
     * Geometry
     */
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.Parameters.count * 3);
    const colors = new Float32Array(this.Parameters.count * 3);
    for (let i = 0; i < this.Parameters.count; i++) {
      const i3 = i * 3;
      //positions
      const radius = Math.random() * this.Parameters.radius;
      const hole = radius * this.Parameters.hole;
      const spinAngle = radius * this.Parameters.spin;
      const branchesAngle = ((i % this.Parameters.branches) / this.Parameters.branches) * Math.PI * 2;
      const randomX =
        Math.pow(Math.random(), this.Parameters.randomnessPower) +
        (Math.random() < 0.5 ? 1 : -1) * this.Parameters.randomness;
      const randomY =
        Math.pow(Math.random(), this.Parameters.randomnessPower) +
        (Math.random() < 0.5 ? 1 : -1) * this.Parameters.randomness;
      const randomZ =
        Math.pow(Math.random(), this.Parameters.randomnessPower) +
        (Math.random() < 0.5 ? 1 : -1) * this.Parameters.randomness;
      positions[i3] = Math.cos(branchesAngle + spinAngle) * radius + randomX; // x
      positions[i3 + 1] = hole + randomY; // y
      positions[i3 + 2] = Math.sin(branchesAngle + spinAngle) * radius + randomZ; // z

      //color
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / this.Parameters.radius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    /**
     * Material
     */
    this.material = new THREE.PointsMaterial({
      size: this.Parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.group.add(this.points);
  }
  show(previouspath) {
    this.Init();
    this.points.onAfterRender = () => {
      if (this.points.RENDERED) return;
      this.points.RENDERED = true;
      Emit.Emitter.emit(Emit.EmitEvent.PAGE_TRANSI_SHOWCALLBACK);
    };

    this.scene.add(this.group);
    GSAP.to(document.querySelector(".Sktech__container canvas"), {
      background: "rgba(0,0,0,1)",
    });
  }
  hide(nextpath) {
    if (this.debugFolder) this.debugFolder.destroy();
    // this.controls.removeEventListener();
    // this.controls.dispose();
    this.camera.instance.position.z = 5;
    this.camera.instance.position.x = 0;
    this.camera.instance.position.y = 0;
    this.camera.instance.rotation.z = 0;
    this.camera.instance.rotation.x = 0;
    this.camera.instance.rotation.y = 0;
    GSAP.to(document.querySelector(".Sktech__container canvas"), {
      background: "rgba(0,0,0,0)",
    });
  }

  debug() {
    if (window.DEBUG) {
      this.debugFolder = window.DEBUG.addFolder("Galaxy").close();
      this.debugFolder.add(this.Parameters, "size", 0, 0.5, 0.001).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "count", 0, 1000000, 1).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "radius", 0.01, 30, 0.01).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "branches", 1, 20, 1).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "spin", 0, 10, 0.001).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "randomness", 0, 2, 0.001).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "randomnessPower", -50, 50, 0.001).onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "hole", -10, 10, 0.0001).onFinishChange(() => this.create());
      this.debugFolder.addColor(this.Parameters, "insideColor").onFinishChange(() => this.create());
      this.debugFolder.addColor(this.Parameters, "outsideColor").onFinishChange(() => this.create());
      this.debugFolder.add(this.Parameters, "CameraPos");
      this.debugFolder.add(this.Parameters, "GenerateMode");
    }
  }

  MODE() {
    this.modestate++;
    switch (this.modestate) {
      case 0:
        this.Parameters.color = "black";
        this.Parameters.count = 200000;
        this.Parameters.size = 0.01;
        this.Parameters.radius = 5;
        this.Parameters.branches = 5;
        this.Parameters.spin = 0.8;
        this.Parameters.randomness = 1.1;
        this.Parameters.randomnessPower = 4.9;
        this.Parameters.hole = 0.4;
        this.Parameters.insideColor = "#ff6030";
        this.Parameters.outsideColor = "#1b3984";
        this.camera.instance.position.z = 3;
        this.camera.instance.position.y = 2;
        this.camera.instance.position.z = 5;
        this.camera.instance.rotation.x = 0;
        this.camera.instance.rotation.y = 0;
        this.camera.instance.rotation.z = 0;
        break;
      case 1:
        this.Parameters.radius = 5;
        this.Parameters.branches = 10;
        this.Parameters.spin = 5;
        this.Parameters.randomness = 0;
        this.Parameters.randomnessPower = 10;
        this.Parameters.hole = -5;
        this.Parameters.insideColor = "#981b1b";
        this.Parameters.outsideColor = "#fe9706";
        this.camera.instance.position.x = -0.26;
        this.camera.instance.position.y = -11.17;
        this.camera.instance.position.z = 1.54;
        this.camera.instance.rotation.x = 0;
        this.camera.instance.rotation.y = 0;
        this.camera.instance.rotation.z = 0;
        break;
      case 2:
        this.Parameters.count = 200000;
        this.Parameters.size = 0.01;
        this.Parameters.radius = 20;
        this.Parameters.branches = 10;
        this.Parameters.spin = 0;
        this.Parameters.randomness = 0;
        this.Parameters.randomnessPower = 10;
        this.Parameters.hole = -5;
        this.camera.instance.position.x = -1.97;
        this.camera.instance.position.y = -14.61;
        this.camera.instance.position.z = -2.94;
        this.camera.instance.rotation.x = 1.82;
        this.camera.instance.rotation.y = -0.14;
        this.camera.instance.rotation.z = 2.64;
        break;
      case 3:
        this.Parameters.count = 200000;
        this.Parameters.size = 0.01;
        this.Parameters.radius = 30;
        this.Parameters.branches = 20;
        this.Parameters.spin = 0;
        this.Parameters.randomness = 2;
        this.Parameters.randomnessPower = 50;
        this.Parameters.hole = 0.4129;
        this.camera.instance.position.x = -2.08;
        this.camera.instance.position.y = 3.01;
        this.camera.instance.position.z = -1.12;
        this.camera.instance.rotation.x = -2.1;
        this.camera.instance.rotation.y = -0.54;
        this.camera.instance.rotation.z = -2.43;
        break;
      case 4:
        this.Parameters.count = 200000;
        this.Parameters.size = 0.01;
        this.Parameters.radius = 5;
        this.Parameters.branches = 5;
        this.Parameters.spin = 0.8;
        this.Parameters.randomness = 0.623;
        this.Parameters.randomnessPower = 14.356;
        this.Parameters.hole = 3.6086;
        this.camera.instance.position.x = 0.05;
        this.camera.instance.position.y = 14.92;
        this.camera.instance.position.z = 1.59;
        this.camera.instance.rotation.x = -1.46;
        this.camera.instance.rotation.y = 0.0;
        this.camera.instance.rotation.z = 0.03;
        break;
      default:
        this.modestate = 0;
        this.Parameters.count = 200000;
        this.Parameters.size = 0.01;
        this.Parameters.radius = 5;
        this.Parameters.branches = 5;
        this.Parameters.spin = 0.8;
        this.Parameters.randomness = 1.1;
        this.Parameters.randomnessPower = 4.9;
        this.Parameters.hole = 0.4;
        this.Parameters.insideColor = "#ff6030";
        this.Parameters.outsideColor = "#1b3984";
        this.camera.instance.position.z = 3;
        this.camera.instance.position.y = 2;
        this.camera.instance.position.z = 5;
        this.camera.instance.rotation.x = 0;
        this.camera.instance.rotation.y = 0;
        this.camera.instance.rotation.z = 0;
        break;
    }

    this.create();
  }
  /*----------------------------------------------------------------------------------------------------------------------
|           EVENTS
------------------------------------------------------------------------------------------------------------------------*/
  TOUCHDOWN() {}
  TOUCHUP() {}
  SIZES(e) {}
  TIME(e) {
    if (!this.init && this.renderer) return;
    this.group.rotation.y = e * 0.1;

    // if (this.controls) this.controls.update();

    this.renderer.instance.render(this.scene, this.camera.instance);
  }
}
