export const INTERACTIVE_TAG = ['button', 'a'] as const
export type InteractiveTag = (typeof INTERACTIVE_TAG)[number]

export type InteractiveAs<T extends React.ElementType> = T extends InteractiveTag
  ? T
  : T extends string
    ? never
    : T
