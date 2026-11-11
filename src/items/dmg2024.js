// Light emitting items from Dungeon Master's Guide 2024.
import {ItemSpec} from "../models/item-spec.js";

export default [
  new ItemSpec({
    name: "Quarterstaff of the Acrobat",
    color: "#66FF66",
    angle: 360,
    bright: 0,
    dim: 10,
    animation: {type: "pulse", speed: 4, intensity: 6},
  }),
  new ItemSpec({
    name: "Energy Bow",
    color: "#CCFFFF",
    angle: 360,
    bright: 20,
    dim: 40,
    animation: {type: "pulse", speed: 2, intensity: 4},
  }),
];
