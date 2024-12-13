export function getActorVision(actor) {
    const senses = actor.system.attributes?.senses;
    if (senses) {
      if (senses.darkvision > 0) return { mode: "darkvision", range: senses.darkvision };
      else if (senses.tremorsense > 0) return { mode: "tremorsense", range: senses.tremorsense };
      else return { mode: "basic", range: 0 };
    }
}