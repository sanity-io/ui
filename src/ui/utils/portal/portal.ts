import {createElement, ReactNode, ReactPortal} from 'react'
import {createPortal} from 'react-dom'

import {CardProvider, useCard} from '../../primitives'
import {usePortal} from './usePortal'

/**
 * @public
 */
export interface PortalProps {
  children: ReactNode
  /**
   * @beta This API might change. DO NOT USE IN PRODUCTION.
   */
  __unstable_name?: string
}

/**
 * @public
 */
export function Portal(props: PortalProps): ReactPortal | null {
  const {children, __unstable_name: name} = props
  const card = useCard()
  const portal = usePortal()
  const portalElement =
    (name ? portal.elements && portal.elements[name] : portal.element) || portal.elements?.default

  if (!portalElement) {
    return null
  }

  return createPortal(
    createElement(
      CardProvider,
      {
        rendered: true,
        tone: 'transparent', // card?.tone || 'default',
        scheme: card?.scheme || 'light',
      },
      children,
    ),
    portalElement,
  )
}

Portal.displayName = 'Portal'
