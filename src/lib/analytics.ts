export const eventNames = ['portal_session_start', 'game_card_open', 'game_load_start', 'game_load_success', 'game_load_error', 'first_input', 'meaningful_progress', 'stage_complete', 'run_complete', 'retry', 'related_game_open', 'language_change', 'save_result', 'ad_opportunity', 'ad_resume'] as const;
export type EventName = (typeof eventNames)[number];
export type LocalEvent = { name: EventName; gameId?: string; locale: 'ja' | 'en'; result?: string };
export type EventRecord = LocalEvent & { sequence: number };
export function createAnalytics() {
  const records: EventRecord[] = [];
  let sequence = 0;
  return {
    emit(event: LocalEvent) {
      // Allowlisted fields, no free-form payload or state/user identifiers.
      records.push({ name: event.name, gameId: event.gameId, locale: event.locale, result: event.result, sequence: ++sequence });
      if (records.length > 50) records.shift();
    },
    snapshot: () => records.map(record => ({ ...record })),
  };
}
