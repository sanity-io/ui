import {useEffect} from 'react'
import {SelectPropOptionsProp, SelectPropValue} from '../types'
import {useScope} from '../useScope'

export function useSelect<T extends SelectPropValue>(
  name: string,
  options: SelectPropOptionsProp<T>,
  defaultValue?: T,
  groupName = 'Props'
): T | undefined {
  const {registerProp, schemas, unregisterProp, value} = useScope()

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

  const schema = schemas.find((s) => s.name === name)

  return value[name] === undefined ? schema?.defaultValue : value[name]
}
