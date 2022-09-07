import {ThemeColorSchemeKey} from '@sanity/ui'
import {WorkshopState} from './state'

/** @public */
export interface WorkshopFrameReadyMsg {
  type: 'workshop/frameReady'
}

/** @public */
export interface WorkshopSetStateMsg {
  type: 'workshop/setState'
  value: WorkshopState
}

/** @public */
export interface WorkshopSetZoomMsg {
  type: 'workshop/setZoom'
  value: number
}

/** @public */
export interface WorkshopSetViewportMsg {
  type: 'workshop/setViewport'
  value: string
}

/** @public */
export interface WorkshopToggleSchemeMsg {
  type: 'workshop/toggleScheme'
}

/** @public */
export interface WorkshopSetSchemeMsg {
  type: 'workshop/setScheme'
  value: ThemeColorSchemeKey
}

/** @public */
export interface WorkshopSetPathMsg {
  type: 'workshop/setPath'
  value: string
}

/** @public */
export interface WorkshopSetPayloadMsg {
  type: 'workshop/setPayload'
  value: Record<string, unknown>
}

/** @public */
export interface WorkshopSetPayloadValueMsg {
  type: 'workshop/setPayloadValue'
  key: string
  value: unknown
}

/** @public */
export type WorkshopMsg =
  | WorkshopFrameReadyMsg
  | WorkshopSetStateMsg
  | WorkshopSetZoomMsg
  | WorkshopSetViewportMsg
  | WorkshopToggleSchemeMsg
  | WorkshopSetSchemeMsg
  | WorkshopSetPathMsg
  | WorkshopSetPayloadMsg
  | WorkshopSetPayloadValueMsg
