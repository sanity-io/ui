import {useContext, useEffect} from 'react'
import {PopoverContext} from './popoverContext'

/**
 * @public
 */
export const useOnForcedUpdate = (eventHandler: () => void): void => {
  const contextValue = useContext(PopoverContext)

  useEffect(() => {
    if (contextValue?.lastUpdateId !== null) {
      eventHandler?.()
    }
  }, [contextValue?.lastUpdateId])
}
