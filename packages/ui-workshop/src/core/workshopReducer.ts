import isEqual from 'lodash/isEqual'

import type {WorkshopMsg} from './types/msg'
import type {WorkshopPayload, WorkshopState} from './types/state'

/** @internal */
export function workshopReducer(state: WorkshopState, msg: WorkshopMsg): WorkshopState {
  if (msg.type === 'workshop/frameReady') {
    if (state.frameReady) return state

    return {...state, frameReady: true}
  }

  if (msg.type === 'workshop/setZoom') {
    if (state.zoom === msg.value) return state

    return {...state, zoom: msg.value}
  }

  if (msg.type === 'workshop/setViewport') {
    if (state.viewport === msg.value) return state

    return {...state, viewport: msg.value}
  }

  if (msg.type === 'workshop/setScheme') {
    if (state.scheme === msg.value) return state

    return {...state, scheme: msg.value}
  }

  if (msg.type === 'workshop/setPath') {
    if (state.path === msg.value) return state

    return {...state, path: msg.value}
  }

  if (msg.type === 'workshop/setPayload') {
    if (isEqual(state.payload, msg.value)) {
      return state
    }

    return {...state, payload: msg.value}
  }

  if (msg.type === 'workshop/setPayloadValue') {
    const payload: WorkshopPayload = {...state.payload, [msg.key]: msg.value}

    if (isEqual(state.payload, payload)) {
      return state
    }

    return {...state, payload}
  }

  return state
}
