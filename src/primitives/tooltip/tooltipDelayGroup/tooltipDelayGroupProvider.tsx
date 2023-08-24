import {useDelayedState} from '../../../hooks/useDelayedState'
import {TooltipDelayGroupContext} from './tooltipDelayGroupContext'
/**
 * @beta
 * */
export interface TooltipDelayGroupProviderProps {
  children?: React.ReactNode
  /**
   * @beta Adds a delay to open the tooltip.
   * If only a number is passed, it will be used for both opening and closing.
   * If an object is passed, it can be used to set different delays for opening and closing.
   */
  delay?:
    | number
    | {
        open: number
        close: number
      }
}

/**
 * @beta
 * Provides context for a group of tooltip elements that should share a delay
 * which temporarily becomes 1 ms after the first floating element of the group opens.
 */
export function TooltipDelayGroupProvider(
  props: TooltipDelayGroupProviderProps,
): React.ReactElement {
  const {children, delay} = props
  const [isGroupActive, setIsGroupActive] = useDelayedState(false)
  const openDelay = delay && typeof delay === 'object' ? delay.open : delay || 0
  const closeDelay = delay && typeof delay === 'object' ? delay.close : delay || 0
  return (
    <TooltipDelayGroupContext.Provider
      value={{
        isGroupActive: isGroupActive,
        setIsGroupActive: setIsGroupActive,
        // When the group is active, we want the next tooltip to open immediately.
        openDelay: isGroupActive ? 1 : openDelay,
        closeDelay: closeDelay,
      }}
    >
      {children}
    </TooltipDelayGroupContext.Provider>
  )
}
