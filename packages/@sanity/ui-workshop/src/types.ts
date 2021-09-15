import {AxeResults} from 'axe-core'
import React from 'react'

export interface WorkshopFeatures {
  navbar: boolean
}

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

export interface WorkshopCollection {
  name: string
  title: string
}

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

export interface ScopeContextValue {
  axeResults: AxeResults | null
  schemas: PropSchema[]
  scope: WorkshopScope | null
  story: WorkshopStory | null
  registerProp: (Prop: PropSchema) => void
  setPropValue: (PropName: string, value: any) => void
  unregisterProp: (PropName: string) => void
  value: any
}

export type WorkshopQuery = {
  [key: string]: string | number | boolean | WorkshopQuery
}

export interface WorkshopLocation {
  path: string
  query?: WorkshopQuery
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
