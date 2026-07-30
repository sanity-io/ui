/** @beta */
export type ArrayPropPrimitive = string | number | boolean | undefined | null

/**
 * @deprecated instead of `useArrayProp(width)` use `Array.isArray(width) ? width : [width]` instead
 * @beta
 */
export function useArrayProp(_val?: never, _defaultVal?: never): never {
  throw new Error(
    '`useArrayProp` was removed in @sanity/ui v4. Use `Array.isArray(value) ? value : [value]` instead.',
  )
}
