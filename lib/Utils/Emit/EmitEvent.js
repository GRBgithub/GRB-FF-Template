const Event = {
  /*
   * ACTION
   */
  TIME: "TIME",
  SIZES: "SIZES",
  TOUCHDOWN: "TOUCHDOWN",
  TOUCHUP: "TOUCHUP",
  TOUCHMOVE: "TOUCHMOVE",
  DRAGGING: "DRAGGING",
  WHEEL: "WHEEL",
  CLICK: "CLICK",
  PRESS_HOLD: "PRESS_HOLD",
  PRESS_HOLD_RESET: "PRESS_HOLD_RESET",
  /*
   * WAIT ACTION
   */
  WAITSTART: "WAITSTART",
  WAITEND: "WAITEND",
  /*
   * LOADER
   */
  LOADER_START: "LOADER_START",
  LOADER_PROGRESS: "LOADER_PROGRESS",
  LOADER_FINISH: "LOADER_FINISH",
  LOADER_ANIM_FINISH: "LOADER_ANIM_FINISH",
  /*
   * ROUTING
   */
  PAGE_ROUTING: "PAGE_ROUTING",
  PAGE_TRANSI_HIDECALLBACK: "PAGE_TRANSI_HIDECALLBACK",
  PAGE_TRANSI_SHOWCALLBACK: "PAGE_TRANSI_SHOWCALLBACK",

  /*
   * Device
   */
  FULLSCREENMODE: "FULLSCREENMODE",
  DEVICE_ORIENTATION: "DEVICE_ORIENTATION",
  DEVICE_MOTION: "DEVICE_MOTION",

  /*
   * Music
   */
  MUSIC_HIDE: "MUSIC_HIDE",
  MUSIC_SHOW: "MUSIC_SHOW",
};

export default Event;
