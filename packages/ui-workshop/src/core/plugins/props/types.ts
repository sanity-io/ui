/** @public */
export interface GenericPropSchema<T = unknown> {
  name: string
  defaultValue?: T
  groupName?: string
}

/** @public */
export interface BooleanPropSchema extends GenericPropSchema<boolean> {
  type: 'boolean'
}

/** @public */
export interface NumberPropSchema extends GenericPropSchema<number> {
  type: 'number'
}

/** @public */
export type SelectPropValue = string | number | boolean | undefined

/** @public */
export type SelectPropOptions<T extends SelectPropValue = SelectPropValue> =
  | Record<PropertyKey, T>
  | Record<Extract<T, PropertyKey>, T[keyof T]>
  | T[]
  | readonly T[]

/** @public */
export interface SelectPropSchema<
  T extends SelectPropValue = SelectPropValue,
> extends GenericPropSchema<T> {
  type: 'select'
  options: SelectPropOptions<T>
}

/** @public */
export interface StringPropSchema extends GenericPropSchema<string> {
  type: 'string'
}

/** @public */
export interface TextPropSchema extends GenericPropSchema<string> {
  type: 'text'
}

/** @public */
export type PropSchema =
  | BooleanPropSchema
  | NumberPropSchema
  | SelectPropSchema
  | StringPropSchema
  | TextPropSchema

/** @public */
export interface PropsState {
  schemas: PropSchema[]
  value: Record<string, unknown>
}
