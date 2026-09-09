/**
 * Occupancy of child layers registered on a `LayerProvider`.
 *
 * `size` is the number of unique child levels plus the number of
 * legacy `registerChild()` calls that omitted a level. A provider is
 * the top layer when `size === 0`.
 *
 * @internal
 */
export interface LayerState {
  readonly childLayers: Readonly<Record<number, number>>
  readonly legacy: number
  readonly size: number
}

/**
 * @internal
 */
export type LayerAction =
  | {readonly type: 'register'; readonly level?: number}
  | {readonly type: 'unregister'; readonly level?: number}

/**
 * @internal
 */
export const INITIAL_LAYER_STATE: LayerState = {
  childLayers: {},
  legacy: 0,
  size: 0,
}

function nextState(childLayers: Readonly<Record<number, number>>, legacy: number): LayerState {
  return {
    childLayers,
    legacy,
    size: legacy + Object.keys(childLayers).length,
  }
}

/**
 * @internal
 */
export function layerReducer(state: LayerState, action: LayerAction): LayerState {
  switch (action.type) {
    case 'register': {
      const {level} = action

      if (level === undefined) {
        return nextState(state.childLayers, state.legacy + 1)
      }

      const count = state.childLayers[level] ?? 0

      return nextState({...state.childLayers, [level]: count + 1}, state.legacy)
    }

    case 'unregister': {
      const {level} = action

      if (level === undefined) {
        if (state.legacy === 0) {
          return state
        }

        return nextState(state.childLayers, state.legacy - 1)
      }

      const count = state.childLayers[level]

      if (!count) {
        return state
      }

      if (count === 1) {
        const childLayers = {...state.childLayers}

        delete childLayers[level]

        return nextState(childLayers, state.legacy)
      }

      return nextState({...state.childLayers, [level]: count - 1}, state.legacy)
    }

    default: {
      const _exhaustive: never = action

      return _exhaustive
    }
  }
}
