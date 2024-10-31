import {composeClassNames, menuDivider} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MenuDividerProps {}

/**
 * @public
 */
export const MenuDivider = forwardRef(function MenuDivider(
  props: Props<MenuDividerProps, 'div'>,
  ref: ForwardedRef<HTMLHRElement>,
) {
  const {className, ...restProps} = props

  return <hr {...restProps} className={composeClassNames(className, menuDivider())} ref={ref} />
})

MenuDivider.displayName = 'MenuDivider'
