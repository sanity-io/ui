import {useMemo} from 'react'

import {useDelayedState} from '../../../hooks/useDelayedState'
import {Delay} from '../../types'
import {TooltipDelayGroupContext} from './tooltipDelayGroupContext'
import {TooltipDelayGroupContextValue} from './types'

/**
 * @public
 * */
export interface TooltipDelayGroupProviderProps {
  children?: React.ReactNode
  /**
   * Handles the delays to open or close a tooltip inside a group
   *
   * If only a `number` is passed, it will be used for both opening and closing.
   *
   * If an object `{open: number; close:number}` is passed, it can be used to set different delays for each action.
   *
   * @public
   */
  delay: Delay
}

/**
 * @public
 * Provides context for a group of tooltip elements that should share a delay
 * which temporarily becomes 1 ms after the first floating element of the group opens.
 */
export function TooltipDelayGroupProvider(
  props: TooltipDelayGroupProviderProps,
): React.JSX.Element {
  const {children, delay} = props
  const [isGroupActive, setIsGroupActive] = useDelayedState(false)
  const [openTooltipId, setOpenTooltipId] = useDelayedState<string | null>(null)

  const openDelay = typeof delay === 'number' ? delay : delay?.open || 0
  const closeDelay = typeof delay === 'number' ? delay : delay?.close || 0

  const value: TooltipDelayGroupContextValue = useMemo(
    () => ({
      setIsGroupActive: setIsGroupActive,
      openTooltipId: openTooltipId,
      setOpenTooltipId: setOpenTooltipId,
      // When the group is active, we want the next tooltip to open immediately.
      openDelay: isGroupActive ? 1 : openDelay,
      closeDelay: closeDelay,
    }),
    [closeDelay, isGroupActive, openDelay, openTooltipId, setIsGroupActive, setOpenTooltipId],
  )

  return (
    <TooltipDelayGroupContext.Provider value={value}>{children}</TooltipDelayGroupContext.Provider>
  )
}

TooltipDelayGroupProvider.displayName = 'TooltipDelayGroupProvider'
