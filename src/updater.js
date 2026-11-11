/** Token fields (relative to TokenDocument / prototypeToken) for a vision result. */
export function getVisionUpdate(vision) {
  return {
    "sight.enabled": true,
    "sight.visionMode": vision.mode,
    "sight.range": vision.range,
  };
}

/** Token fields (relative to TokenDocument / prototypeToken) for a light emitting item spec. */
export function getLightUpdate(spec) {
  return {
    "light.angle": spec.angle,
    "light.color": spec.color,
    "light.bright": spec.bright,
    "light.dim": spec.dim,
    "light.alpha": 0.5,
    "light.animation.type": spec.animation.type,
    "light.animation.speed": spec.animation.speed,
    "light.animation.intensity": spec.animation.intensity,
    "light.animation.reverse": false,
  };
}

/** Keep only the entries whose value differs from the document, to avoid no-op updates and hook loops. */
function diff(source, update) {
  const result = {};
  for (const [key, value] of Object.entries(update)) {
    const current = foundry.utils.getProperty(source, key);
    // Colors are stored as Color objects (numbers) once prepared: compare their css string.
    const normalized = (current !== null && typeof current === "object" && "css" in current) ? current.css : current;
    if (normalized !== value && !(normalized == null && value == null)) result[key] = value;
  }
  return result;
}

/**
 * Apply a token update to the actor's prototype token and to its tokens in the given scene (the one viewed by default).
 * The caller must own the actor: owners may update the actor, its prototype token and its tokens.
 */
export async function updateActorTokens(actor, update, scene = canvas?.scene) {
  const prototypeChanges = diff(actor.prototypeToken, update);
  if (!foundry.utils.isEmpty(prototypeChanges)) {
    const prefixed = Object.fromEntries(Object.entries(prototypeChanges).map(([k, v]) => [`prototypeToken.${k}`, v]));
    await actor.update(prefixed);
  }

  if (!scene) return;
  const updates = [];
  for (const token of scene.tokens) {
    if (token.actorId !== actor.id) continue;
    const changes = diff(token, update);
    if (!foundry.utils.isEmpty(changes)) updates.push({_id: token.id, ...changes});
  }
  if (updates.length) await scene.updateEmbeddedDocuments("Token", updates);
}
