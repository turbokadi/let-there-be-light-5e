// Light emitting items from Tasha's Cauldron of Everything.
import {ItemSpec} from "../models/item-spec.js";

export default [
  new ItemSpec({
    name: "Illuminator's Tattoo",
    color: "#9370DB",
    angle: 360,
    bright: 0,
    dim: 10,
    animation: {type: "pulse", speed: 3, intensity: 6},
  }),
  new ItemSpec({
    name: "Masquerade Tattoo",
    color: "#ADD8E6",
    angle: 360,
    bright: 0,
    dim: 10,
    animation: {type: "pulse", speed: 3, intensity: 6},
  }),
  new ItemSpec({
    name: "Bloodwell Vial",
    color: "#D12F2F",
    angle: 360,
    bright: 20,
    dim: 40,
    animation: {type: "pulse", speed: 2, intensity: 3},
  }),
];
