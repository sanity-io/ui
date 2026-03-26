type BooleanPropDef = {
  type: 'boolean'
  className: string
  inverse: string
}

type NumberPropDef = {
  type: 'number'
  className: string
  variable: string
}

type StringPropDef = {
  type: 'string'
  className?: string
  variable?: string
}

type UnionPropDef<T> = {
  type: 'union'
  className: string
  values: readonly T[]
}

export type PropDef<T = any> =
  | BooleanPropDef
  | NumberPropDef
  | StringPropDef
  | UnionPropDef<T>
