import {useEffect} from 'react'
import {useProps} from '../useProps'

/** @internal */
export function useText(
  name: string,
  defaultValue?: string,
  groupName = 'Props'
): string | undefined {
  const {registerProp, unregisterProp, value} = useProps()

  useEffect(() => {
    registerProp({
      type: 'text',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  return value[name] === undefined ? defaultValue : (value[name] as string)
}
