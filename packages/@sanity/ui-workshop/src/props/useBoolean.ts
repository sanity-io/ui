import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useBoolean(
  name: string,
  defaultValue?: boolean,
  groupName = 'Props'
): boolean | undefined {
  const {registerProp, schemas, unregisterProp, value} = useScope()

  useEffect(() => {
    registerProp({
      type: 'boolean',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  const schema = schemas.find((s) => s.name === name)

  return value[name] === undefined ? schema?.defaultValue : value[name]
}
