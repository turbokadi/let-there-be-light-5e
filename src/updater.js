import {getActorVision} from "./vision.js";
import {detectAndCleanActorLightItem} from "./light.js";

export async function updateProtoypeTokenVision(actor) {
  const vision = getActorVision(actor);
  await actor.update({
    "prototypeToken.sight.visionMode": vision.mode,
    "prototypeToken.sight.range": vision.range,
    "prototypeToken.sight.enabled": true,
  });
  return vision;
}

export async function updateTokenVision(vision, token) {
  await token.document.update({
    "sight.visionMode": vision.mode,
    "sight.range": vision.range,
    "sight.enabled": true,
  });
}

export async function updateProtoypeTokenLight(actor, itemList, newOneId) {
  const item = detectAndCleanActorLightItem(actor, itemList, newOneId);
  await actor.update({
    "prototypeToken.light.angle": item.angle,
    "prototypeToken.light.color": item.color,
    "prototypeToken.light.angle": item.angle,
    "prototypeToken.light.bright": item.bright,
    "prototypeToken.light.dim": item.dim,
    "prototypeToken.light.animation.type": item.type,
    "prototypeToken.light.animation.speed": item.speed,
    "prototypeToken.light.animation.intensity": item.intensity,
  });
  return item;
}

export async function updateTokenLight(item, token) {
  await token.document.update({
    light: {
      angle: item.angle,
      color: item.color,
      angle: item.angle,
      bright: item.bright,
      dim: item.dim,
      alpha: 0.5,
      animation: {
        type: item.type,
        speed: item.speed,
        intensity: item.intensity,
        reverse: false
      }
    }
  });
}
