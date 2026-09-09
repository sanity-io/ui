/** @internal */
export interface LayerState {
  childLayers: Record<number, number>
  childrenWithoutLevel: number
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

/** @internal */
export const initialLayerState: LayerState = {childLayers: {}, childrenWithoutLevel: 0}

/** @internal */
export function layerReducer(state: LayerState, action: LayerAction): LayerState {
  const {level} = action

  switch (action.type) {
    case 'child/register': {
      if (level === undefined) {
        return {...state, childrenWithoutLevel: state.childrenWithoutLevel + 1}
      }

      const count = state.childLayers[level] ?? 0

      return {...state, childLayers: {...state.childLayers, [level]: count + 1}}
    }

    case 'child/unregister': {
      if (level === undefined) {
        return {...state, childrenWithoutLevel: state.childrenWithoutLevel - 1}
      }

      const count = state.childLayers[level]

      if (count === 1) {
        const {[level]: _removed, ...childLayers} = state.childLayers

        return {...state, childLayers}
      }

      return {...state, childLayers: {...state.childLayers, [level]: count - 1}}
    }

    default: {
      const unhandled: never = action

      return unhandled
    }
  }
}
