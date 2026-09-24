export const HEADING_TAG = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export type HeadingTag = (typeof HEADING_TAG)[number]

export const HEADING_SIZE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const
/** @public */
export type HeadingSize = (typeof HEADING_SIZE)[number]
