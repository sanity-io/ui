import {PropSchema} from './types'

export interface PropsSetValueMsg {
  type: 'workshop/props/setValue'
  value: Record<string, unknown>
}

export interface PropsRegisterPropMsg {
  type: 'workshop/props/registerProp'
  schema: PropSchema
}

export interface PropsSetPropValueMsg {
  type: 'workshop/props/setPropValue'
  name: string
  value: unknown
}

export interface PropsUnregisterPropMsg {
  type: 'workshop/props/unregisterProp'
  name: string
}

export type PropsMsg =
  | PropsSetValueMsg
  | PropsRegisterPropMsg
  | PropsSetPropValueMsg
  | PropsUnregisterPropMsg
