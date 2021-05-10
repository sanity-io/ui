import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useNumber(
  name: string,
  defaultValue?: number,
  groupName?: string
): number | undefined {
  const {knobs, registerKnob, unregisterKnob} = useScope()

  useEffect(() => {
    registerKnob({
      type: 'number',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterKnob(name)
  }, [defaultValue, groupName, name, registerKnob, unregisterKnob])

  const knob = knobs.find((k) => k.schema.name === name)

  return knob ? knob.value : defaultValue
}
