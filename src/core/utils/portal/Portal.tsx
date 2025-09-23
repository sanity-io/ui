import {type ReactNode, type ReactPortal, use} from 'react'
import {createPortal} from 'react-dom'

import {CardContext} from '../../primitives/card/CardContext'
import {CardProvider} from '../../primitives/card/CardProvider'
import {assertCardContext} from '../../primitives/card/useCard'
import {usePortal} from './usePortal'

/** @public */
export interface PortalProps {
  children: ReactNode
  /**
   * @beta This API might change. DO NOT USE IN PRODUCTION.
   */
  __unstable_name?: string
}

/** @public */
export function Portal(props: PortalProps): ReactPortal | null {
  const {children, __unstable_name: name} = props
  const portal = usePortal()
  const portalElement =
    (name ? portal.elements && portal.elements[name] : portal.element) ||
    portal.elements?.['default']

  if (!portalElement) {
    return null
  }

  const card = use(CardContext)
  assertCardContext(card)

  return createPortal(
    <CardProvider tone="transparent" scheme={card.scheme}>
      {children}
    </CardProvider>,
    portalElement,
  )
}
