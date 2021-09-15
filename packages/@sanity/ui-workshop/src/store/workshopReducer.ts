import {WorkshopMsg, WorkshopState} from './types'

export function workshopReducer(state: WorkshopState, msg: WorkshopMsg): WorkshopState {
  if (msg.type === 'workshop/ready') {
    return state
  }

  if (msg.type === 'workshop/setValue') {
    return {...state, value: msg.value}
  }

  if (msg.type === 'workshop/registerProp') {
    return {...state, schemas: state.schemas.concat([msg.schema])}
  }

  if (msg.type === 'workshop/unregisterProp') {
    return {...state, schemas: state.schemas.filter((s) => s.name === msg.name)}
  }

  if (msg.type === 'workshop/setPropValue') {
    return {...state, value: {...state.value, [msg.name]: msg.value}}
  }

  if (msg.type === 'workshop/queue') {
    return msg.queue.reduce(workshopReducer, state)
  }

  // console.warn('unhandled msg', msg)

  return state
}
