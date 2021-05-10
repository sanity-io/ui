import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useText(
  name: string,
  defaultValue?: string,
  groupName?: string
): string | undefined {
  const {knobs, registerKnob, unregisterKnob} = useScope()

  useEffect(() => {
    registerKnob({
      type: 'text',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterKnob(name)
  }, [defaultValue, groupName, name, registerKnob, unregisterKnob])

  const knob = knobs.find((k) => k.schema.name === name)

  return knob ? knob.value : defaultValue
}
