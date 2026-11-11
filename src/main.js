import {updateActorTokens, getVisionUpdate, getLightUpdate} from "./updater.js";
import {getActorVision} from "./vision.js";
import {detectActorLightItem} from "./light.js";
import ITEM_SPECS from "./items/index.js";

const CHARACTER_TAG = "character";

/**
 * Which client writes the documents, so an update is not applied by every connected client:
 * - after a change (equip, unequip, actor update): the user who made it. Being allowed to change the
 *   item or the actor means owning it, hence being allowed to update its prototype token and tokens.
 * - when a user displays a scene (including on load): that user, for the characters they own.
 * Tokens are updated in the scene viewed by the writing user.
 */
function isWriter(actor, userId) {
  if (userId) return userId === game.user.id;
  return actor.isOwner;
}

function isCharacter(actor) {
  return actor?.documentName === "Actor" && actor.type === CHARACTER_TAG;
}

async function updateActorVision(actor, {userId, scene} = {}) {
  if (!isCharacter(actor) || !isWriter(actor, userId)) return;
  const vision = getActorVision(actor);
  await updateActorTokens(actor, getVisionUpdate(vision), scene);
}

async function updateActorLight(actor, {newOneId, userId, scene} = {}) {
  if (!isCharacter(actor) || !isWriter(actor, userId)) return;
  const {light, toUnequip, notifications} = detectActorLightItem(actor, ITEM_SPECS, newOneId);
  for (const {level, message} of notifications) ui.notifications[level](message);
  if (toUnequip.length) {
    await actor.updateEmbeddedDocuments("Item", toUnequip.map(_id => ({_id, "system.equipped": false})));
  }
  await updateActorTokens(actor, getLightUpdate(light), scene);
}

/** Reload vision and light of every character, on the prototype tokens and in the given scene. */
async function updateAllCharacters({userId, scene} = {}) {
  if (!game.actors) return;
  for (const actor of game.actors) {
    if (!isCharacter(actor) || !isWriter(actor, userId)) continue;
    await updateActorVision(actor, {userId, scene});
    await updateActorLight(actor, {userId, scene});
  }
}

// The user displays a scene (on load or when changing scene): reload the characters they own on it.
Hooks.on("canvasReady", async () => {
  await updateAllCharacters();
});

Hooks.on("updateActor", async (actor, changes, options, userId) => {
  await updateActorVision(actor, {userId});
});

Hooks.on("updateItem", async (item, changes, options, userId) => {
  await updateActorLight(item.parent, {newOneId: item.id, userId});
});

Hooks.on("createItem", async (item, options, userId) => {
  await updateActorLight(item.parent, {newOneId: item.id, userId});
});

Hooks.on("deleteItem", async (item, options, userId) => {
  await updateActorLight(item.parent, {userId});
});
