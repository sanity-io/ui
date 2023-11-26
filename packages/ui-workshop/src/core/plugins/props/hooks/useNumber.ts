import {useEffect} from 'react'

import {useProps} from '../useProps'

/** @internal */
export function useNumber(
  name: string,
  defaultValue?: number,
  groupName = 'Props',
): number | undefined {
  const {registerProp, unregisterProp, value} = useProps()

  useEffect(() => {
    registerProp({
      type: 'number',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  return value[name] === undefined ? defaultValue : (value[name] as number)
}
