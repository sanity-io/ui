import {ThemeColorSchemeKey} from '@sanity/ui'
import {AxeResults} from 'axe-core'
import {WorkshopLocation} from '..'
import {PropSchema} from '../types'

export interface WorkshopState {
  axeResults: AxeResults | null
  schemas: PropSchema[]
  value: Record<string, any>
}

export interface WorkshopReadyMsg {
  type: 'workshop/ready'
  path: string
}

export interface WorkshopSetValueMsg {
  type: 'workshop/setValue'
  value: Record<string, any>
}

export interface WorkshopRegisterPropMsg {
  type: 'workshop/registerProp'
  schema: PropSchema
}

export interface WorkshopSetPropValueMsg {
  type: 'workshop/setPropValue'
  name: string
  value: any
}

export interface WorkshopUnregisterPropMsg {
  type: 'workshop/unregisterProp'
  name: string
}

export interface WorkshopQueueMsg {
  type: 'workshop/queue'
  queue: any[]
}

export interface WorkshopSetLocation {
  type: 'workshop/main/setLocation'
  path: string
  scheme: ThemeColorSchemeKey
}

export interface WorkshopFrameSetAxeResults {
  type: 'workshop/frame/setAxeResults'
  results: AxeResults | null
}

export interface WorkshopFramePushLocationMsg {
  type: 'workshop/frame/pushLocation'
  location: WorkshopLocation
}

export interface WorkshopFrameReplaceLocationMsg {
  type: 'workshop/frame/replaceLocation'
  location: WorkshopLocation
}

export type WorkshopMsg =
  | WorkshopReadyMsg
  | WorkshopSetValueMsg
  | WorkshopRegisterPropMsg
  | WorkshopSetPropValueMsg
  | WorkshopUnregisterPropMsg
  | WorkshopQueueMsg
  | WorkshopSetLocation
  | WorkshopFrameSetAxeResults
  | WorkshopFramePushLocationMsg
  | WorkshopFrameReplaceLocationMsg
