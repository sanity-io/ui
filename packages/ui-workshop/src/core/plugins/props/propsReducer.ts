import type {WorkshopMsg} from '../../types/msg'
import type {PropsMsg} from './msg'
import type {PropsState} from './types'

/** @internal */
export function propsReducer(state: PropsState, msg: WorkshopMsg | PropsMsg): PropsState {
  if (msg.type === 'workshop/props/setValue') {
    if (state.value === msg.value) {
      return state
    }

    return {
      ...state,
      value: msg.value,
    }
  }

  if (msg.type === 'workshop/props/registerProp') {
    const schemaIsRegistered = state.schemas.some((s) => s.name === msg.schema.name)

    if (schemaIsRegistered) {
      return state
    }

    return {
      ...state,
      schemas: state.schemas.concat([msg.schema]),
    }
  }

  if (msg.type === 'workshop/props/setPropValue') {
    if (state.value[msg.name] === msg.value) {
      return state
    }

    return {
      ...state,
      value: {...state.value, [msg.name]: msg.value},
    }
  }

  return state
}
