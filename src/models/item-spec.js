/**
 * Specification of an item that emits light once equipped.
 * Light fields follow Foundry's token light data (distances in scene units, angle in degrees).
 */
export class ItemSpec {
  /**
   * @param {object} spec
   * @param {string} spec.name             Exact item name, used to match the actor's items.
   * @param {string|null} [spec.color]     Light color (hex), null for the default color.
   * @param {number} [spec.angle]          Emission angle in degrees.
   * @param {number} [spec.bright]         Bright light radius.
   * @param {number} [spec.dim]            Dim light radius.
   * @param {object} [spec.animation]      Light animation.
   * @param {string|null} [spec.animation.type]
   * @param {number} [spec.animation.speed]
   * @param {number} [spec.animation.intensity]
   */
  constructor({name, color = null, angle = 360, bright = 0, dim = 0, animation = {}}) {
    const {type = null, speed = 5, intensity = 5} = animation;
    this.name = name;
    this.color = color;
    this.angle = angle;
    this.bright = bright;
    this.dim = dim;
    this.animation = Object.freeze({type, speed, intensity});
    Object.freeze(this);
  }

  /** No light: applied when the actor has no light emitting item equipped. */
  static NONE = new ItemSpec({name: ""});
}
