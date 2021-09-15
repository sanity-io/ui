import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useNumber(
  name: string,
  defaultValue?: number,
  groupName = 'Props'
): number | undefined {
  const {registerProp, schemas, unregisterProp, value} = useScope()

  useEffect(() => {
    registerProp({
      type: 'number',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  const schema = schemas.find((s) => s.name === name)

  return value[name] === undefined ? schema?.defaultValue : value[name]
}
