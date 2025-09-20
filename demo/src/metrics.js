// demo/src/metrics.js
// Lightweight event tracker used by the demo app. Intentionally minimal.

export function trackEvent(name, payload = {}) {
  const ts = new Date().toISOString();
  const event = { name, ts, ...payload };

  // In a real app, send this to your analytics backend:
  // fetch('/metrics', { method: 'POST', body: JSON.stringify(event) })
  // For now, log to console so we can verify behavior in CI / PR docs.
  console.log('[metrics]', JSON.stringify(event));
}

export function withTiming(name, fn) {
  const start = performance.now();
  try {
    const result = fn();
    const end = performance.now();
    trackEvent(`${name}:success`, { durationMs: Math.round(end - start) });
    return result;
  } catch (err) {
    const end = performance.now();
    trackEvent(`${name}:error`, { durationMs: Math.round(end - start), message: String(err) });
    throw err;
  }
}
