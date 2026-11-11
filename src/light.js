import {ItemSpec} from "./models/item-spec.js";

function hasUsesLeft(item) {
    const uses = item.system.uses;
    if (!uses || !uses.max) return true;
    return uses.spent === 0 || uses.value > 0;
}

/**
 * Find the light source equipped by an actor, and the items that must be unequipped
 * (no use left, or conflicting with an already equipped light source).
 * This function has no side effect: the caller applies updates and notifications.
 */
export function detectActorLightItem(actor, itemSpecs, newOneId) {
    const notifications = [];
    const toUnequip = [];
    const equipped = [];

    for (const item of actor.items) {
        if (!item.system.equipped) continue;
        const definition = itemSpecs.find(spec => spec.name === item.name);
        if (!definition) continue;
        if (!hasUsesLeft(item)) {
            notifications.push({level: "warn", message: game.i18n.localize("ltbl5e.no_use_left") + item.name});
            toUnequip.push(item.id);
            continue;
        }
        equipped.push({item, definition});
    }

    if (equipped.length > 1) {
        // Keep the light source that was already equipped, drop the newly equipped one(s).
        const kept = equipped.find(e => e.item.id !== newOneId) ?? equipped[0];
        for (const e of equipped) {
            if (e !== kept) toUnequip.push(e.item.id);
        }
        notifications.push(equipped.length > 2
            ? {level: "warn", message: game.i18n.localize("ltbl5e.multiple_items")}
            : {level: "info", message: kept.item.name + game.i18n.localize("ltbl5e.light_conflict")});
        return {light: kept.definition, toUnequip, notifications};
    }

    return {light: equipped[0]?.definition ?? ItemSpec.NONE, toUnequip, notifications};
}
