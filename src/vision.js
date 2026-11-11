export function getActorVision(actor) {
  const senses = actor.system.attributes?.senses;
  // dnd5e >= 5.3 stores ranges in `senses.ranges`, older versions directly on `senses`.
  const ranges = senses?.ranges ?? senses ?? {};
  if (ranges.darkvision > 0) return { mode: "darkvision", range: ranges.darkvision };
  if (ranges.tremorsense > 0) return { mode: "tremorsense", range: ranges.tremorsense };
  return { mode: "basic", range: 0 };
}
