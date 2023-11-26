import {useEffect} from 'react'

import {SelectPropOptionsProp, SelectPropValue} from '../types'
import {useProps} from '../useProps'

/** @internal */
export function useSelect<T extends SelectPropValue>(
  name: string,
  options: SelectPropOptionsProp<T>,
  defaultValue?: T,
  groupName = 'Props',
): T | undefined {
  const {registerProp, unregisterProp, value} = useProps()

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

  return value[name] === undefined ? defaultValue : (value[name] as T)
}
