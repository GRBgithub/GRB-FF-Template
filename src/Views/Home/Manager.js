import GSAP from "gsap";
import * as THREE from "three";
import { Route } from "./Config";
import Views from "../../../lib/Routing/Views";
import Camera from "../../../lib/Utils/ThreeCamera";
import Renderer from "../../../lib/Utils/ThreeRenderer";
import Galaxy from "../../World/Galaxy";
export default class Manager extends Views {
  constructor() {
    super(Route);
    this.Elements = {
      views: `[data-key='${Route}']`,
    };
  }

  in({ PrevUrl, InFinish }) {
    this.createGalaxy();
    this.animation = GSAP.timeline({
      onComplete: () => {
        InFinish();
      },
      defaults: { duration: 0.8, ease: "expo" },
    }).fromTo(
      this.DOM.views,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    );
    console.log(this.DOM.views);
  }

  out({ NextUrl, NextShow, OutFinish }) {
    this.Galaxy.hide();
    this.animation = GSAP.timeline({
      onStart: () => {
        NextShow();
      },
      onComplete: () => {
        OutFinish();
      },
      defaults: { duration: 0.8, ease: "expo" },
    }).fromTo(
      this.DOM.views,
      {
        opacity: 1,
      },
      {
        opacity: 0,
      }
    );
    console.log(this.DOM.views);
  }
  createGalaxy() {
    if (!this.jh) {
      this.jh = true;
      this.scene = new THREE.Scene();

      this.camera = new Camera(this.scene);
      this.renderer = new Renderer({
        scene: this.scene,
        camera: this.camera.instance,
        view: ".ThreejsTest",
        className: "x",
        fullbox: false,
      });
      this.renderer.pause = false;
      this.Galaxy = new Galaxy(this.scene, this.camera, this.renderer);
      this.Galaxy.show();
    } else {
      this.renderer.AppendDom();
    }
  }
  TIME(e) {
    if (this.Galaxy) this.Galaxy.TIME(e);
  }
  SIZES(e) {}
  DEBUG() {}
}
