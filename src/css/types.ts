import type CSS from 'csstype'

import type {BREAKPOINTS} from './constants'
import {varNames} from './theme'

/** @public */
export type ExtractStringValues<T> = T extends string
  ? T
  : T extends object
    ? ExtractStringValues<T[keyof T]>
    : never

/** @public */
export type VarNames = typeof varNames

/** @public */
export type VarName = ExtractStringValues<VarNames>

/** @public */
export type Breakpoint = keyof typeof BREAKPOINTS

/** @public */
export type ResponsiveProp<T> = T | Array<T | null | undefined>

/** @public */
export interface Rules {
  [className: string]: Properties
}

/** @public */
export interface CustomCSSProperties {
  [key: VarName]: string | number
}

/** @public */
export interface BaseProperties extends CSS.Properties {
  _prefix?: boolean
  vars?: Partial<CustomCSSProperties>
}

/** @public */
export interface PropertiesWithVarsAndNested extends BaseProperties {
  nest?: Record<string, BaseProperties>
}

/** @public */
export interface Properties extends PropertiesWithVarsAndNested {
  '@media'?: Record<string, PropertiesWithVarsAndNested>
}

/** @public */
export type StyleSelector = `.${string}` | `#${string}` | `:root`

/** @public */
export type StyleRules = Partial<Record<StyleSelector, Properties>>

/** @public */
export type StyleKeyframes = Record<string, Record<string, Properties>>

/** @public */
export type StyleLayers = Record<string, StyleRules>

/** @public */
export interface Style {
  keyframes?: StyleKeyframes
  layers?: StyleLayers
  rules?: StyleRules
}
