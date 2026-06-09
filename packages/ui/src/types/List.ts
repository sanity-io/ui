export const LIST_TAG = ['ol', 'ul'] as const
export type ListTag = (typeof LIST_TAG)[number]
