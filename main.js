import {updateProtoypeTokenVision, updateTokenVision, updateTokenLight, updateProtoypeTokenLight} from "./src/updater.js"
import {LightEmitterItem} from './src/light.js'

const MODULE_NAME = "let-there-be-light-5e";
const CHARACTER_TAG = "character";
const CONFIG_PATH = "./modules/"+MODULE_NAME+"/config";

let _lightEmitterItems = [];

async function updateActorVision(actor) {
  if (actor.type === CHARACTER_TAG) {
    const vision = await updateProtoypeTokenVision(actor);

    canvas.tokens.placeables.forEach(async token => {
      if (token.document.actorId === actor.id) {
        await updateTokenVision(vision, token);
      }
    });
  }
}

async function updateActorLight(actor, newOneId) {
  if (actor.type === CHARACTER_TAG) {
    const lightEmittingItem = await updateProtoypeTokenLight(actor, _lightEmitterItems, newOneId);

    canvas.tokens.placeables.forEach(async token => {
      if (token.document.actorId === actor.id) {
        await updateTokenLight(lightEmittingItem, token);
      }
    });
  }
}

Hooks.on("init", async () => {
  const files = await FilePicker.browse("data", CONFIG_PATH);
  const jsonFiles = files.files.filter(file => file.endsWith(".json"));
  for (const filePath of jsonFiles) {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    for (const json of jsonData["items"]) {
      _lightEmitterItems.push(LightEmitterItem.parse(json));
    }
  }
});

Hooks.on("ready", async () => {
  game.actors.forEach(async (actor) => {
    await updateActorVision(actor);
    await updateActorLight(actor);
  });
});

Hooks.on("updateActor", async (actor) => {
  await updateActorVision(actor);
});

Hooks.on("updateItem", async (item) => {
  await updateActorLight(item.parent, item.id);
});