import {WorkshopMsg} from '../../types'
import {PropsMsg} from './msg'
import {PropsState} from './types'

/** @internal */
export function propsReducer(state: PropsState, msg: WorkshopMsg | PropsMsg): PropsState {
  if (msg.type === 'workshop/props/setValue') {
    return {
      ...state,
      value: msg.value,
    }
  }

  if (msg.type === 'workshop/props/registerProp') {
    return {
      ...state,
      schemas: state.schemas.concat([msg.schema]),
    }
  }

  if (msg.type === 'workshop/props/setPropValue') {
    return {
      ...state,
      value: {...state.value, [msg.name]: msg.value},
    }
  }

  return state
}
