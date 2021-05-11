import {PropSchema, StoryProp} from '../types'

export interface RegistePropMsg {
  type: 'registerProp'
  PropSchema: PropSchema
}

export interface UnregistePropMsg {
  type: 'unregisterProp'
  PropName: string
}

export interface SetPropValueMsg {
  type: 'setPropValue'
  PropName: string
  value: any
}

export type PropsMsg = RegistePropMsg | UnregistePropMsg | SetPropValueMsg

export function propsReducer(Props: StoryProp[], msg: PropsMsg) {
  if (msg.type === 'registerProp') {
    return Props.concat([{schema: msg.PropSchema, value: msg.PropSchema.defaultValue}])
  }

  if (msg.type === 'setPropValue') {
    return Props.map((k) => {
      if (k.schema.name === msg.PropName) {
        return {...k, value: msg.value}
      }

      return k
    })
  }

  if (msg.type === 'unregisterProp') {
    return Props.filter((k) => k.schema.name !== msg.PropName)
  }

  return Props
}
