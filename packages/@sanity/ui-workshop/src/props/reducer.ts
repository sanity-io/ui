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

export function propsReducer(props: StoryProp[], msg: PropsMsg): StoryProp[] {
  if (msg.type === 'registerProp') {
    return props.concat([{schema: msg.PropSchema, value: msg.PropSchema.defaultValue}])
  }

  if (msg.type === 'setPropValue') {
    return props.map((k) => {
      if (k.schema.name === msg.PropName) {
        return {...k, value: msg.value}
      }

      return k
    })
  }

  if (msg.type === 'unregisterProp') {
    return props.filter((k) => k.schema.name !== msg.PropName)
  }

  return props
}
