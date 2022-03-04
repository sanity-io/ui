export interface GenericPropSchema<T = unknown> {
  name: string
  defaultValue?: T
  groupName?: string
}

export interface BooleanPropSchema extends GenericPropSchema<boolean> {
  type: 'boolean'
}

export interface NumberPropSchema extends GenericPropSchema<number> {
  type: 'number'
}

export type SelectPropValue = string | number | boolean

export type SelectPropOptionsProp<T extends SelectPropValue = SelectPropValue> =
  | Record<PropertyKey, T>
  | Record<Extract<T, PropertyKey>, T[keyof T]>
  | T[]
  | readonly T[]

export interface SelectPropSchema<T extends SelectPropValue = SelectPropValue>
  extends GenericPropSchema<T> {
  type: 'select'
  options: SelectPropOptionsProp<T>
}

export interface StringPropSchema extends GenericPropSchema<string> {
  type: 'string'
}

export interface TextPropSchema extends GenericPropSchema<string> {
  type: 'text'
}

export type PropSchema =
  | BooleanPropSchema
  | NumberPropSchema
  | SelectPropSchema
  | StringPropSchema
  | TextPropSchema

export interface PropsState {
  schemas: PropSchema[]
  value: Record<string, any>
}
