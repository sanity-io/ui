import {useEffect} from 'react'

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

  useEffect(() => {
    registerProp({
      type: 'select',
      groupName,
      name,
      options: options as SelectPropOptions,
      defaultValue,
    })

    return () => unregisterProp(name)
  }, [defaultValue, groupName, name, options, registerProp, unregisterProp])

  return value[name] === undefined ? defaultValue : (value[name] as T)
}
