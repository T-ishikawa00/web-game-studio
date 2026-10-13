export async function unlockThenStart(audio, { isCurrent, onBlocked, start }) {
  try {
    await audio.unlock();
  } catch {
    if (!isCurrent()) return false;
    onBlocked?.();
  }

  if (!isCurrent()) return false;
  start();
  return true;
}
