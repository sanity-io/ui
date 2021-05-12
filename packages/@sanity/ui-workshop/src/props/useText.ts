import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useText(
  name: string,
  defaultValue?: string,
  groupName?: string
): string | undefined {
  const {props: Props, registerProp, unregisterProp} = useScope()

  useEffect(() => {
    registerProp({
      type: 'text',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, registerProp, unregisterProp])

  const Prop = Props.find((k) => k.schema.name === name)

  return Prop ? Prop.value : defaultValue
}
