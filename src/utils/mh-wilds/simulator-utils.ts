export function calculateExpectedAttack(
  attack: number,
  affinity: number
): number {
  const critMultiplier = 1.25;
  const effectiveAffinity = Math.max(0, affinity);
  return attack * (1 + (effectiveAffinity / 100) * (critMultiplier - 1));
}
