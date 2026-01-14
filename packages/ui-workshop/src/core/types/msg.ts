import type {ColorScheme} from '@sanity/ui/theme'
import type {WorkshopQuery} from './location'
import type {WorkshopPayload} from './state'

/** @public */
export interface WorkshopFrameReadyMsg {
  type: 'workshop/frameReady'
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
  value: ColorScheme
}

/** @public */
export interface WorkshopSetPathMsg {
  type: 'workshop/setPath'
  value: string
}

/** @public */
export interface WorkshopSetPayloadMsg {
  type: 'workshop/setPayload'
  value: WorkshopPayload
}

/** @public */
export interface WorkshopSetPayloadValueMsg {
  type: 'workshop/setPayloadValue'
  key: string
  value: string | number | boolean | WorkshopQuery | undefined
}

/** @public */
export type WorkshopMsg =
  | WorkshopFrameReadyMsg
  | WorkshopSetZoomMsg
  | WorkshopSetViewportMsg
  | WorkshopToggleSchemeMsg
  | WorkshopSetSchemeMsg
  | WorkshopSetPathMsg
  | WorkshopSetPayloadMsg
  | WorkshopSetPayloadValueMsg
