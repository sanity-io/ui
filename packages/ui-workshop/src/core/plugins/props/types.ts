/* eslint-disable @typescript-eslint/no-explicit-any */
/** @internal */
export interface GenericPropSchema<T = unknown> {
  name: string
  defaultValue?: T
  groupName?: string
}

/** @internal */
export interface BooleanPropSchema extends GenericPropSchema<boolean> {
  type: 'boolean'
}

/** @internal */
export interface NumberPropSchema extends GenericPropSchema<number> {
  type: 'number'
}

/** @internal */
export type SelectPropValue = string | number | boolean

/** @internal */
export type SelectPropOptionsProp<T extends SelectPropValue = SelectPropValue> =
  | Record<PropertyKey, T>
  | Record<Extract<T, PropertyKey>, T[keyof T]>
  | T[]
  | readonly T[]

/** @internal */
export interface SelectPropSchema<T extends SelectPropValue = SelectPropValue>
  extends GenericPropSchema<T> {
  type: 'select'
  options: SelectPropOptionsProp<T>
}

/** @internal */
export interface StringPropSchema extends GenericPropSchema<string> {
  type: 'string'
}

/** @internal */
export interface TextPropSchema extends GenericPropSchema<string> {
  type: 'text'
}

/** @internal */
export type PropSchema =
  | BooleanPropSchema
  | NumberPropSchema
  | SelectPropSchema
  | StringPropSchema
  | TextPropSchema

/** @internal */
export interface PropsState {
  schemas: PropSchema[]
  value: Record<string, any>
}
