import {useEffect} from 'react'
import {SelectPropOptionsProp, SelectPropValue} from '../types'
import {useScope} from '../useScope'

export function useSelect<T extends SelectPropValue>(
  name: string,
  options: SelectPropOptionsProp<T>,
  defaultValue?: T,
  groupName?: string
): T | undefined {
  const {props: Props, registerProp, unregisterProp} = useScope()

  useEffect(() => {
    registerProp({
      type: 'select',
      groupName,
      name,
      options: options as SelectPropOptionsProp,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, options, registerProp, unregisterProp])

  const Prop = Props.find((k) => k.schema.name === name)

  return Prop ? Prop.value : defaultValue
}
