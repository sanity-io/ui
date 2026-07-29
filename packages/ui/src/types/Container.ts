export const CONTAINER_SIZE = [0, 1, 2, 3, 4, 5] as const
/** @public */
export type ContainerSize = (typeof CONTAINER_SIZE)[number]
