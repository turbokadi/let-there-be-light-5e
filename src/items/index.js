import dmg2024 from "./dmg2024.js";
import phb2024 from "./phb2024.js";
import srd from "./srd.js";
import tasha from "./tasha.js";

/** @type {import("../models/item-spec.js").ItemSpec[]} Every light emitting item known by the module. Add a new source file here. */
export default [...dmg2024, ...phb2024, ...srd, ...tasha];
