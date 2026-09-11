/** @internal */
export interface LayerState {
  childLayers: ReadonlyMap<number, number>
  childrenWithoutLevel: number
}

/**
 * Children from older `@sanity/ui` copies that share the layer context register without a `level`.
 *
 * @internal
 */
export type LayerAction =
  | {type: 'child/register'; level?: number}
  | {type: 'child/unregister'; level?: number}

/** @internal */
export const initialLayerState: LayerState = {childLayers: new Map(), childrenWithoutLevel: 0}

/** @internal */
export function layerReducer(state: LayerState, action: LayerAction): LayerState {
  const {level} = action

  switch (action.type) {
    case 'child/register': {
      if (level === undefined) {
        return {...state, childrenWithoutLevel: state.childrenWithoutLevel + 1}
      }

      const childLayers = new Map(state.childLayers)

      childLayers.set(level, (childLayers.get(level) ?? 0) + 1)

      return {...state, childLayers}
    }

    case 'child/unregister': {
      if (level === undefined) {
        if (state.childrenWithoutLevel === 0) return state

        return {...state, childrenWithoutLevel: state.childrenWithoutLevel - 1}
      }

      const count = state.childLayers.get(level)

      if (count === undefined) return state

      const childLayers = new Map(state.childLayers)

      if (count === 1) {
        childLayers.delete(level)
      } else {
        childLayers.set(level, count - 1)
      }

      return {...state, childLayers}
    }

    default: {
      action satisfies never

      return state
    }
  }
}
