import {KnobSchema, StoryKnob} from '../types'

export interface RegisteKnobMsg {
  type: 'registerKnob'
  knobSchema: KnobSchema
}

export interface UnregisteKnobMsg {
  type: 'unregisterKnob'
  knobName: string
}

export interface SetKnobValueMsg {
  type: 'setKnobValue'
  knobName: string
  value: any
}

export type KnobsMsg = RegisteKnobMsg | UnregisteKnobMsg | SetKnobValueMsg

export function knobsReducer(knobs: StoryKnob[], msg: KnobsMsg) {
  if (msg.type === 'registerKnob') {
    return knobs.concat([{schema: msg.knobSchema, value: msg.knobSchema.defaultValue}])
  }

  if (msg.type === 'setKnobValue') {
    return knobs.map((k) => {
      if (k.schema.name === msg.knobName) {
        return {...k, value: msg.value}
      }

      return k
    })
  }

  if (msg.type === 'unregisterKnob') {
    return knobs.filter((k) => k.schema.name !== msg.knobName)
  }

  return knobs
}
