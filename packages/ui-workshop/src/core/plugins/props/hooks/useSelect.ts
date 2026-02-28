import {useEffect} from 'react'

import {useUnique} from '../../../lib/commands/useUnique'
import type {SelectPropOptions, SelectPropValue} from '../types'
import {useProps} from '../useProps'

/** @public */
export function useSelect<T extends SelectPropValue>(
  name: string,
  options: SelectPropOptions<T>,
  defaultValue: T,
  groupName?: string,
): T
/** @public */
export function useSelect<T extends SelectPropValue>(
  name: string,
  options: SelectPropOptions<T>,
  defaultValue?: T,
): T | undefined
/** @public */
export function useSelect<T extends SelectPropValue>(
  name: string,
  options: SelectPropOptions<T>,
  defaultValue?: T,
  groupName = 'Props',
): T | undefined {
  const {registerProp, unregisterProp, value} = useProps()

  const stableOptions = useUnique(options)

  useEffect(() => {
    registerProp({
      type: 'select',
      groupName,
      name,
      options: stableOptions as SelectPropOptions,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, stableOptions, registerProp, unregisterProp])

  return value[name] === undefined ? defaultValue : (value[name] as T)
}
