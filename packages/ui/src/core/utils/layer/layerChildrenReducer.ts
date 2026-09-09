export interface LayerChildrenState {
  counts: Record<number, number>
  legacyCount: number
}

export type LayerChildrenAction = {level?: number; type: 'add'} | {level?: number; type: 'remove'}

export const initialLayerChildrenState: LayerChildrenState = {
  counts: {},
  legacyCount: 0,
}

export function getLayerChildrenSize(state: LayerChildrenState): number {
  return Object.keys(state.counts).length + state.legacyCount
}

export function layerChildrenReducer(
  state: LayerChildrenState,
  action: LayerChildrenAction,
): LayerChildrenState {
  switch (action.type) {
    case 'add': {
      const {level} = action

      if (level === undefined) {
        return {...state, legacyCount: state.legacyCount + 1}
      }

      const prev = state.counts[level] ?? 0

      return {...state, counts: {...state.counts, [level]: prev + 1}}
    }
    case 'remove': {
      const {level} = action

      if (level === undefined) {
        if (state.legacyCount === 0) {
          return state
        }

        return {...state, legacyCount: state.legacyCount - 1}
      }

      const prev = state.counts[level]

      if (prev === undefined) {
        return state
      }

      if (prev === 1) {
        const nextCounts = {...state.counts}

        delete nextCounts[level]

        return {...state, counts: nextCounts}
      }

      return {...state, counts: {...state.counts, [level]: prev - 1}}
    }
    default: {
      const _exhaustiveCheck: never = action

      throw new Error(`Unhandled layer children action: ${JSON.stringify(_exhaustiveCheck)}`)
    }
  }
}
