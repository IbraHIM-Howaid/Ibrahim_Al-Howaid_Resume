// One device-capability tier for the whole site, decided once at startup. Expensive effects (animated
// particles, glass refraction, heavy blur) scale down on weaker hardware instead of everyone paying for them.
//   high: mouse + 8+ cores + 8+ GB  -> everything, including the refracting glass
//   mid:  most other devices        -> frosted glass, no refraction
//   low:  ≤4 cores, ≤4 GB, or Data Saver -> still particles, lighter blur
function detectTier() {
  if (typeof window === 'undefined') return 'mid';
  const cores = navigator.hardwareConcurrency || 4;
  // deviceMemory is Chromium-only; Safari/Firefox report nothing, so don't treat them as low-end.
  const memoryGB = navigator.deviceMemory ?? 8;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cores <= 4 || memoryGB <= 4 || navigator.connection?.saveData) return 'low';
  if (finePointer && cores >= 8 && memoryGB >= 8) return 'high';
  return 'mid';
}

export const perfTier = detectTier();

// Exposed to CSS as <html data-perf="low|mid|high">.
if (typeof document !== 'undefined') document.documentElement.dataset.perf = perfTier;
