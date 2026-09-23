import {hues as defaultHues} from '../generator/defaults'
import {Hue, Hues} from '../generator/types'

/** @internal */
export type HuesAction =
  /** Replace the draft: a preset's hues, or `null` to return to the configured theme */
  | {type: 'set'; hues: Hues | null}
  /** Change some properties of one hue of the draft */
  | {type: 'update'; tone: keyof Hues; changes: Partial<Hue>}

/**
 * The draft hues the sidebar edits. `null` means the Studio previews the theme
 * it is configured with; the first edit starts from the default preset, which
 * is what the editors show until then.
 *
 * Every edit derives from the state the reducer is handed rather than from a
 * snapshot of an earlier render, so quick successive edits of different hues
 * all land, and a preset or reset that follows an edit is never overwritten
 * by it.
 *
 * @internal
 */
export function huesReducer(state: Hues | null, action: HuesAction): Hues | null {
  switch (action.type) {
    case 'set':
      return action.hues
    case 'update': {
      const hues = state ?? defaultHues

      return {...hues, [action.tone]: {...hues[action.tone], ...action.changes}}
    }
    default: {
      const exhaustive: never = action

      return exhaustive
    }
  }
}
