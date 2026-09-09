/**
 * The layers registered below a `LayerProvider`.
 *
 * @internal
 */
export interface LayerState {
  /** Number of registered child layers per level (`level -> count`). */
  childLayers: Record<number, number>
  /**
   * Number of levels that have at least one registered child layer, plus one per child that
   * registered without a level. A size of `0` means the layer is the top layer.
   */
  size: number
}

/**
 * Registers or unregisters a child layer. Children from older `@sanity/ui` copies that share the
 * layer context register without a `level`.
 *
 * @internal
 */
export type LayerAction =
  | {type: 'child/register'; level?: number}
  | {type: 'child/unregister'; level?: number}

/**
 * @internal
 */
export const initialLayerState: LayerState = {childLayers: {}, size: 0}

/**
 * @internal
 */
export function layerReducer(state: LayerState, action: LayerAction): LayerState {
  const {level} = action

  switch (action.type) {
    case 'child/register': {
      if (level === undefined) {
        return {...state, size: state.size + 1}
      }

      const count = state.childLayers[level] ?? 0

      return {
        childLayers: {...state.childLayers, [level]: count + 1},
        size: count === 0 ? state.size + 1 : state.size,
      }
    }

    case 'child/unregister': {
      if (level === undefined) {
        return {...state, size: state.size - 1}
      }

      const count = state.childLayers[level] ?? 0

      if (count === 0) {
        return state
      }

      if (count === 1) {
        const {[level]: _removed, ...childLayers} = state.childLayers

        return {childLayers, size: state.size - 1}
      }

      return {...state, childLayers: {...state.childLayers, [level]: count - 1}}
    }

    default: {
      const unhandled: never = action

      return unhandled
    }
  }
}
