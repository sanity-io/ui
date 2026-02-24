import type {WorkshopColorScheme} from '../WorkshopContext'
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
export interface WorkshopSetSchemeMsg {
  type: 'workshop/setScheme'
  value: WorkshopColorScheme
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
  | WorkshopSetSchemeMsg
  | WorkshopSetPathMsg
  | WorkshopSetPayloadMsg
  | WorkshopSetPayloadValueMsg
