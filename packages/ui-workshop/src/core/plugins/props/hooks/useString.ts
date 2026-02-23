import {useEffect} from 'react'

import {useProps} from '../useProps'

/** @internal */
export function useString(
  name: string,
  defaultValue?: string,
  groupName = 'Props',
): string | undefined {
  const {registerProp, unregisterProp, value} = useProps()

  useEffect(() => {
    registerProp({
      type: 'string',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  return value[name] === undefined ? defaultValue : (value[name] as string)
}
