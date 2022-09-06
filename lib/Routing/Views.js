import GSAP from "gsap";
import { getElements } from "../Utils/Helpers";
import Emit from "../Utils/Emit";
export default class Views {
  constructor(Route) {
    this.Route = Route;
    this.IsVisible = false;
    this.IsAnimating = false;
    this.Elements = {
      views: `[data-key='${Route}']`,
    };
    Emit.Emitter.on(Emit.EmitEvent.TIME, (e) => {
      this.TIME(e);
    });
    Emit.Emitter.on(Emit.EmitEvent.SIZES, (e) => {
      this.SIZES(e);
    });
  }

  Vin({ PrevUrl, callback = () => {}, Render = () => {} }) {
    if (this.IsAnimating) return;
    Render();
    this.IsAnimating = true;
    this.DOM = getElements(this.Elements);
    this.View = document.querySelector(`[data-key='${this.Route}']`);
    this.in({
      PrevUrl,
      InFinish: () => {
        this.IsVisible = true;
        this.IsAnimating = false;
        callback();
      },
    });
  }

  Vout({ NextShow = () => {}, NextUrl }) {
    if (this.IsAnimating) return;
    this.IsAnimating = true;
    this.DOM = getElements(this.Elements);
    this.View.classList.add("NOEVENT");
    this.out({
      NextShow,
      NextUrl,
      OutFinish: () => {
        this.IsVisible = false;
        this.IsAnimating = false;
        this.View.remove();
      },
    });
  }

  Vdebug() {
    if (window.DEBUG) {
      this.DEBUG();
    }
  }

  out({ PrevUrl, ShowFinish }) {}
  in({ NextShow, NextUrl, HideFinish }) {}

  TIME(e) {}
  SIZES(e) {}

  DEBUG() {}
}
