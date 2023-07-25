import {useEffect} from 'react'
import {useProps} from '../useProps'

/** @internal */
export function useBoolean(
  name: string,
  defaultValue?: boolean,
  groupName = 'Props',
): boolean | undefined {
  const {registerProp, unregisterProp, value} = useProps()

  useEffect(() => {
    registerProp({
      type: 'boolean',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  return value[name] === undefined ? defaultValue : (value[name] as boolean)
}
