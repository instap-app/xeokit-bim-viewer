import { Controller } from "../Controller.js";

/** @private */
class FullscreenMode extends Controller {
  constructor(parent, cfg) {
    super(parent);
    if (!cfg.buttonElement) {
      throw "Missing config: buttonElement";
    }
    if (!cfg.bimWrapperElement) {
      throw "Missing config: bimWrapperElement";
    }

    const buttonElement = cfg.buttonElement;
    const bimWrapperElement = cfg.bimWrapperElement;

    this.on("enabled", (enabled) => {
      if (!enabled) {
        buttonElement.classList.add("disabled");
      } else {
        buttonElement.classList.remove("disabled");
      }
    });

    this.on("active", (active) => {
      if (active) {
        buttonElement.classList.add("active");
        bimWrapperElement.requestFullscreen();
      } else {
        buttonElement.classList.remove("active");
        if (document.fullscreen) {
          document.exitFullscreen();
        }
      }
    });

    buttonElement.addEventListener("click", (event) => {
      if (!this.getEnabled()) {
        return;
      }
      const active = this.getActive();
      this.setActive(!active);
      event.preventDefault();
    });

    this.bimViewer.on("reset", () => {
      this.setActive(false);
    });

  }
}

export { FullscreenMode };
