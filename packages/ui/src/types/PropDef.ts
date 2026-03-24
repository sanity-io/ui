type BooleanPropDef = {
  type: 'boolean'
  className: string
  inverseClassName: string
}

type EnumPropDef<T> = {
  type: 'enum'
  className: string
  values: readonly T[]
}

type StringPropDef = {
  type: 'string'
  className: string
  variable: string
}

export type PropDef<T = any> =
  | BooleanPropDef
  | EnumPropDef<T>
  | StringPropDef
