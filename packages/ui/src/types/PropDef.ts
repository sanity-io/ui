type BooleanPropDef = {
  type: 'boolean'
  className?: string
  inverse: string
}

type NumberPropDef = {
  type: 'number'
  className?: string
  variable: string
}

type StringPropDef = {
  type: 'string'
  className?: string
  variable?: string
}

type UnionPropDef<T> = {
  type: 'union'
  className?: string
  values: readonly T[]
}

/** A composite prop def defines a prop that takes a union of
 * values (represented by the composition object’s keys) which
 * map to a composition of one or more class names (represented
 * by the composition object’s values).
 */
type CompositePropDef = {
  type: 'composite'
  composition: Record<string, Record<string, unknown>>
}

export type PropDef<T = unknown> =
  | BooleanPropDef
  | NumberPropDef
  | StringPropDef
  | UnionPropDef<T>
  | CompositePropDef
