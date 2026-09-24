/**
 * Prop is a boolean. If used for styling, provide a className
 * to apply CSS and an inverseClassName to reset it.
 */
type BooleanPropDef = {
  type: 'boolean'
  className?: string
  inverseClassName?: string
}

/**
 * Prop is a number. If used for styling, provide a className
 * that references the variable for dynamic values.
 */
type NumberPropDef = {
  type: 'number'
  className?: string
  variable?: string
}

/**
 * Prop is a string. If used for styling, provide a className
 * that references the variable for dynamic values.
 */
type StringPropDef = {
  type: 'string'
  className?: string
  variable?: string
}

/**
 * Prop is a union of values. Values are always required. If
 * used for styling, provide a className.
 */
type UnionPropDef<T> = {
  type: 'union'
  className?: string
  values: readonly T[]
}

/**
 * Prop is a composite of other props. Requires a union of values and
 * a composition object which defines the props and their mappings.
 * The values should map to the composition object's mapping keys.
 */
type CompositePropDef<T> = {
  type: 'composite'
  values: readonly T[]
  composition: Record<
    string,
    {
      propDef: PropDef
      mapping: Record<T & PropertyKey, unknown>
    }
  >
}

/**
 * Prop is a composite of other props. Requires a resolve callback with
 * a value param that returns another prop def.
 */
type ConditionalPropDef<T> = {
  type: 'conditional'
  resolve: (value: T) => PropDef<T>
}

export type PropDef<T = unknown> =
  | BooleanPropDef
  | NumberPropDef
  | StringPropDef
  | UnionPropDef<T>
  | CompositePropDef<T>
  | ConditionalPropDef<T>
