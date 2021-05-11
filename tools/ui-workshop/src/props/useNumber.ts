import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useNumber(
  name: string,
  defaultValue?: number,
  groupName?: string
): number | undefined {
  const {props: Props, registerProp, unregisterProp} = useScope()

  useEffect(() => {
    registerProp({
      type: 'number',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  const Prop = Props.find((k) => k.schema.name === name)

  return Prop ? Prop.value : defaultValue
}
