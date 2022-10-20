import {PropSchema} from './types'

/** @internal */
export interface PropsSetValueMsg {
  type: 'workshop/props/setValue'
  value: Record<string, unknown>
}

/** @internal */
export interface PropsRegisterPropMsg {
  type: 'workshop/props/registerProp'
  schema: PropSchema
}

/** @internal */
export interface PropsSetPropValueMsg {
  type: 'workshop/props/setPropValue'
  name: string
  value: unknown
}

/** @internal */
export interface PropsUnregisterPropMsg {
  type: 'workshop/props/unregisterProp'
  name: string
}

/** @internal */
export type PropsMsg =
  | PropsSetValueMsg
  | PropsRegisterPropMsg
  | PropsSetPropValueMsg
  | PropsUnregisterPropMsg
