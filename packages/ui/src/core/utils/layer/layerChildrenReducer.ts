/**
 * @internal
 */
export interface LayerChildrenState {
  anonymous: number
  counts: Record<number, number>
  size: number
}

/**
 * @internal
 */
export type LayerChildrenAction =
  | {type: 'register'; level?: number}
  | {type: 'unregister'; level?: number}

/**
 * @internal
 */
export const INITIAL_LAYER_CHILDREN_STATE: LayerChildrenState = {
  anonymous: 0,
  counts: {},
  size: 0,
}

function register(state: LayerChildrenState, level: number | undefined): LayerChildrenState {
  if (level === undefined) {
    return {
      anonymous: state.anonymous + 1,
      counts: state.counts,
      size: state.size + 1,
    }
  }

  const prev = state.counts[level] ?? 0

  return {
    anonymous: state.anonymous,
    counts: {...state.counts, [level]: prev + 1},
    size: prev === 0 ? state.size + 1 : state.size,
  }
}

function unregister(state: LayerChildrenState, level: number | undefined): LayerChildrenState {
  if (level === undefined) {
    if (state.anonymous === 0) return state

    return {
      anonymous: state.anonymous - 1,
      counts: state.counts,
      size: state.size - 1,
    }
  }

  const prev = state.counts[level]

  if (!prev) return state

  if (prev === 1) {
    const counts = {...state.counts}
    delete counts[level]

    return {anonymous: state.anonymous, counts, size: state.size - 1}
  }

  return {
    anonymous: state.anonymous,
    counts: {...state.counts, [level]: prev - 1},
    size: state.size,
  }
}

/**
 * @internal
 */
export function layerChildrenReducer(
  state: LayerChildrenState,
  action: LayerChildrenAction,
): LayerChildrenState {
  switch (action.type) {
    case 'register':
      return register(state, action.level)
    case 'unregister':
      return unregister(state, action.level)
    default: {
      const exhaustive: never = action
      return exhaustive
    }
  }
}
