export interface WorkshopStory {
  name: string
  title: string
  component: React.ComponentType
}

export interface WorkshopScope {
  name: string
  title: string
  stories: WorkshopStory[]
}

export interface GenericKnobSchema<T = unknown> {
  name: string
  defaultValue?: T
  groupName?: string
}

export interface BooleanKnobSchema extends GenericKnobSchema<boolean> {
  type: 'boolean'
}

export interface NumberKnobSchema extends GenericKnobSchema<number> {
  type: 'number'
}

export type SelectKnobValue = string | number | boolean

// interface SelectKnobOptionsProp<T> {
//   [key: string]: T
// }

export type SelectKnobOptionsProp<T extends SelectKnobValue = SelectKnobValue> =
  | Record<PropertyKey, T>
  | Record<Extract<T, PropertyKey>, T[keyof T]>
  | T[]
  | readonly T[]

export interface SelectKnobSchema<T extends SelectKnobValue = SelectKnobValue>
  extends GenericKnobSchema<T> {
  type: 'select'
  options: SelectKnobOptionsProp<T>
}

export interface StringKnobSchema extends GenericKnobSchema<string> {
  type: 'string'
}

export interface TextKnobSchema extends GenericKnobSchema<string> {
  type: 'text'
}

export type KnobSchema =
  | BooleanKnobSchema
  | NumberKnobSchema
  | SelectKnobSchema
  | StringKnobSchema
  | TextKnobSchema

export interface StoryKnob {
  schema: KnobSchema
  value: any
}

export interface ScopeContextValue {
  scope: WorkshopScope | null
  story: WorkshopStory | null
  knobs: StoryKnob[]
  registerKnob: (knob: KnobSchema) => void
  setKnobValue: (knobName: string, value: any) => void
  // title: string
  unregisterKnob: (knobName: string) => void
}

export interface WorkshopLocation {
  path: string
}

export interface WorkshopContextValue {
  frameUrl: string
  location: WorkshopLocation
  pushLocation: (loc: WorkshopLocation) => void
  replaceLocation: (loc: WorkshopLocation) => void
  scope: WorkshopScope | null
  scopes: WorkshopScope[]
  story: WorkshopStory | null
  title: string
}
