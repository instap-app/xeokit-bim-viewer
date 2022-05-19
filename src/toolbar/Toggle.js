import { Controller } from "../Controller.js";

/** @private */
class Toggle extends Controller {
  constructor(parent, cfg) {

    super(parent);

    if (!cfg.buttonElement) {
      throw "Missing config: buttonElement";
    }

    const buttonElement = cfg.buttonElement;


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
        this.fire("active-toggle");
      } else {
        buttonElement.classList.remove("active");
        this.fire("unActive-toggle");
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

export { Toggle };

