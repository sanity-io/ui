import {ThemeColorSchemeKey} from '@sanity/ui'
import {WorkshopState} from './state'

export interface WorkshopFrameReadyMsg {
  type: 'workshop/frameReady'
}

export interface WorkshopSetStateMsg {
  type: 'workshop/setState'
  value: WorkshopState
}

export interface WorkshopSetZoomMsg {
  type: 'workshop/setZoom'
  value: number
}

export interface WorkshopSetViewportMsg {
  type: 'workshop/setViewport'
  value: string
}

export interface WorkshopToggleSchemeMsg {
  type: 'workshop/toggleScheme'
}

export interface WorkshopSetSchemeMsg {
  type: 'workshop/setScheme'
  value: ThemeColorSchemeKey
}

export interface WorkshopSetPathMsg {
  type: 'workshop/setPath'
  value: string
}

export interface WorkshopSetPayloadMsg {
  type: 'workshop/setPayload'
  value: Record<string, unknown>
}

export interface WorkshopSetPayloadValueMsg {
  type: 'workshop/setPayloadValue'
  key: string
  value: unknown
}

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
