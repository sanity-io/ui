import {type ReactNode, useCallback, useMemo, useRef, useState} from 'react'

import type {Delay} from '../../../types'
import {DEFAULT_TOOLTIP_DELAY} from '../constants'
import {TooltipDelayGroupContext} from './TooltipDelayGroupContext'
import type {TooltipDelayGroupContextValue} from './types'

/**
 * @public
 * */
export interface TooltipDelayGroupProviderProps {
  children?: ReactNode
  /**
   * Handles the delays to open or close a tooltip inside a group
   *
   * If only a `number` is passed, it will be used for both opening and closing.
   *
   * If an object `{open: number; close:number}` is passed, it can be used to set different delays for each action.
   *
   * @public
   */
  delay?: Delay
}

/**
 * @public
 * Provides context for a group of tooltip elements that should share a delay
 * which temporarily becomes 0ms after the first tooltip of the group opens.
 */
export function TooltipDelayGroupProvider(
  props: TooltipDelayGroupProviderProps,
): React.JSX.Element {
  const {children, delay = DEFAULT_TOOLTIP_DELAY} = props

  const [visibleTooltipId, setVisibleTooltipId] = useState<string | undefined>(undefined)

  const openDelay = typeof delay === 'number' ? delay : delay?.open || 0
  const openDelayRef = useRef(openDelay)

  const closeDelay = typeof delay === 'number' ? delay : delay?.close || 0
  const closeDelayRef = useRef(closeDelay)

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const openRef = useRef(false)

  const handleOpenChange = useCallback(
    (params: {open: boolean; id: string; immediate?: boolean}) => {
      const {open, id, immediate} = params

      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = undefined
      }

      if (open) {
        // open

        if (immediate) {
          setVisibleTooltipId(id)
          openRef.current = true
          return
        }

        // If the group is already open, we want the next tooltip to open immediately.
        const ms = openRef.current ? 0 : openDelayRef.current

        timerRef.current = setTimeout(() => {
          setVisibleTooltipId(id)
          openRef.current = true
        }, ms)
        return
      }

      // close

      if (immediate) {
        setVisibleTooltipId(undefined)
        openRef.current = false
        return
      }

      timerRef.current = setTimeout(() => {
        setVisibleTooltipId(undefined)
        openRef.current = false
      }, closeDelayRef.current)
    },
    [],
  )

  const value: TooltipDelayGroupContextValue = useMemo(
    () => ({handleOpenChange, visibleTooltipId}),
    [handleOpenChange, visibleTooltipId],
  )

  return <TooltipDelayGroupContext value={value}>{children}</TooltipDelayGroupContext>
}
