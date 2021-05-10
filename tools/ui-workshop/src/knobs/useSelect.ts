import {useEffect} from 'react'
import {SelectKnobOptionsProp, SelectKnobValue} from '../types'
import {useScope} from '../useScope'

export function useSelect<T extends SelectKnobValue>(
  name: string,
  options: SelectKnobOptionsProp<T>,
  defaultValue?: T,
  groupName?: string
): T | undefined {
  const {knobs, registerKnob, unregisterKnob} = useScope()

  useEffect(() => {
    registerKnob({
      type: 'select',
      groupName,
      name,
      options: options as SelectKnobOptionsProp,
      defaultValue,
    })

    return () => unregisterKnob(name)
  }, [defaultValue, groupName, name, options, registerKnob, unregisterKnob])

  const knob = knobs.find((k) => k.schema.name === name)

  return knob ? knob.value : defaultValue
}
