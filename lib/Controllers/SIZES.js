import Emit from "../Utils/Emit";
/*---------------------------------------------------------------------------------------
    SIZES CONTROLLER EMIT SIZES CHANGEMENT & SET THE REAL WIDTH & HEIGHT FOR THE CSS
------------------------------------------------------------------------------------------*/
export default class SIZES {
  constructor() {
    this.UpdateSizes();
    this.timeout = null;
    this.SetDocSizes();
    window.addEventListener("resize", () => {
      this.UpdateSizes();
      this.SetDocSizes();
    });
  }

  SetDocSizes() {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    doc.style.setProperty("--app-width", `${window.innerWidth}px`);
  }
  UpdateSizes() {
    Emit.Emitter.emit(Emit.EmitEvent.WAITSTART);
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      window.SIZES = { pixelRatio: this.pixelRatio };
      Emit.Emitter.emit(Emit.EmitEvent.SIZES, {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: this.pixelRatio,
      });
      Emit.Emitter.emit(Emit.EmitEvent.WAITEND);
    }, 1000);
  }
}
