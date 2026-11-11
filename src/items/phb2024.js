// Light emitting items from Player's Handbook 2024.
import {ItemSpec} from "../models/item-spec.js";

export default [
  new ItemSpec({
    name: "Lantern, Bullseye",
    color: "#fff1b4",
    angle: 45,
    bright: 60,
    dim: 120,
    animation: {type: "torch", speed: 1, intensity: 1},
  }),
  new ItemSpec({
    name: "Lantern, Hooded",
    color: "#fff1b4",
    angle: 360,
    bright: 30,
    dim: 60,
    animation: {type: "torch", speed: 1, intensity: 2},
  }),
];
