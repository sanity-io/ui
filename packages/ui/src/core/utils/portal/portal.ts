import {createPortal} from 'react-dom'

import {resolvePortalElement} from './resolvePortalElement'
import {usePortal} from './usePortal'

/**
 * @public
 */
export interface PortalProps {
  children: React.ReactNode
  /**
   * @beta This API might change. DO NOT USE IN PRODUCTION.
   */
  __unstable_name?: string
}

/**
 * @public
 */
export function Portal(props: PortalProps): React.ReactPortal | null {
  const {children, __unstable_name: name} = props
  const portal = usePortal()
  const portalElement = resolvePortalElement(portal, name)

  if (!portalElement) {
    return null
  }

  return createPortal(children, portalElement)
}
