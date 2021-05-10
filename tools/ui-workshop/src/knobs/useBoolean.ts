import {useEffect} from 'react'
import {useScope} from '../useScope'

export function useBoolean(
  name: string,
  defaultValue?: boolean,
  groupName?: string
): boolean | undefined {
  const {knobs, registerKnob, unregisterKnob} = useScope()

  useEffect(() => {
    registerKnob({
      type: 'boolean',
      groupName,
      name,
      defaultValue,
    })

    return () => unregisterKnob(name)
  }, [defaultValue, groupName, name, registerKnob, unregisterKnob])

  const knob = knobs.find((k) => k.schema.name === name)

  return knob ? knob.value : defaultValue
}
