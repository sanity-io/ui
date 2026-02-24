import {kbd, KBD_STYLE_PROP_KEYS} from '@sanity/ui/css'
import type {KBDStyleProps} from '@sanity/ui-css'

import {_splitKeys} from '../../_keys'
import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_KBD_ELEMENT = 'kbd'

/** @public */
export type KBDOwnProps = KBDStyleProps

/** @public */
export type KBDElementType = 'kbd' | ComponentType

/** @public */
export type KBDProps<E extends KBDElementType = KBDElementType> = Props<KBDOwnProps, E>

/**
 * Used to define some text as keyboard input.
 *
 * @public
 */
export function KBD<E extends KBDElementType = typeof DEFAULT_KBD_ELEMENT>(
  props: KBDProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_KBD_ELEMENT,
      children,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as KBDProps<typeof DEFAULT_KBD_ELEMENT>, KBD_STYLE_PROP_KEYS)

  return (
    <Element data-ui="KBD" {...domProps} className={kbd(styleProps)}>
      {children}
    </Element>
  )
}
