/** @internal */
export const CONTAINER_SCALE = [0, 1, 2, 3, 4, 5] as const

/** @internal */
export const CONTAINER: [...typeof CONTAINER_SCALE, 'auto'] = [...CONTAINER_SCALE, 'auto']
