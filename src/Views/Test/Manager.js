
import GSAP from "gsap";
import { Route } from "./Config";
import Views from "../../../lib/Routing/Views";


export default class Manager extends Views {
  constructor() {
    super(Route);
    this.Elements = {
      views: `[data-key='${Route}']`,
    };
  }

  in({ PrevUrl, InFinish }) {
    this.animation = GSAP.timeline({
      onComplete: () => {
        InFinish();
        this.CreateRED();
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


  TIME(e) {}
  SIZES(e) {}
  DEBUG() {}
}

