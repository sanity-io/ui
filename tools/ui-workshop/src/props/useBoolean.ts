import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useBoolean(
  name: string,
  defaultValue?: boolean,
  groupName?: string
): boolean | undefined {
  const {props: Props, registerProp, unregisterProp} = useScope()

  useEffect(() => {
    registerProp({
      type: 'boolean',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  const Prop = Props.find((k) => k.schema.name === name)

  return Prop ? Prop.value : defaultValue
}
