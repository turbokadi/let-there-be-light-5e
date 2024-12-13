export class LightEmitterItem {
    static parse(parse) {
        return new LightEmitterItem(
            parse["name"],
            parse["color"],
            parse["angle"],
            parse["bright"],
            parse["dim"],
            parse["animation"]["type"],
            parse["animation"]["speed"],
            parse["animation"]["intensity"]
        )
    }

    constructor(
        name,
        color,
        angle,
        bright,
        dim,
        type,
        speed,
        intensity
    ) {
        this.name = name;
        this.color = color;
        this.angle = angle;
        this.bright = bright;
        this.dim = dim;
        this.type = type;
        this.speed = speed;
        this.intensity = intensity;
    }
}

export function detectAndCleanActorLightItem(actor, itemList, newOneId) {
    let probs_equipped_item = undefined;
    let equipped_item = undefined;
    let notified = false;

    const lightEmmisionsCount = actor.items.filter(map => {
        const item = itemList.find(item => map.name === item.name);
        if (item && map.system.equipped) {
            if ( map.system.uses.spent === 0 || map.system.uses.value > 0 ) {
                if (map.id !== newOneId) {
                    probs_equipped_item = item;
                }
                return true;
            } else {
                ui.notifications.warn(game.i18n.localize("ltbl5e.no_use_left") + map.name), { timeout: 3000 };
                map.update({
                    "system.equipped": false
                });
            }
        }
        return false;
    }).length;

    actor.items.forEach(map => {
        const item = itemList.find(item => map.name === item.name);
        if (item && map.system.equipped && (map.system.uses.spent === 0 || map.system.uses.value > 0) ) {
            if (
                (equipped_item === undefined && lightEmmisionsCount < 2) ||
                (equipped_item === undefined && map.id !== newOneId)
            ) {
                equipped_item = item;
            } else if (lightEmmisionsCount > 2) {
                if (!notified) {
                    notified = true;
                    ui.notifications.warn(game.i18n.localize("ltbl5e.multiple_items"), { timeout: 3000 });
                }
                map.update({
                    "system.equipped": false
                });
            } else {
                ui.notifications.info(probs_equipped_item.name + game.i18n.localize("ltbl5e.light_conflict"), { timeout: 3000 });
                map.update({
                    "system.equipped": false
                });
            }
        }
    });

    if (equipped_item === undefined) {
        equipped_item = new LightEmitterItem("",null,360,0,0,"none",5,5);
    }

    return equipped_item;
}