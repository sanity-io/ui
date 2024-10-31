import {composeClassNames, menuDivider} from '@sanity/ui/css'
import {forwardRef, HTMLProps} from 'react'

/**
 * @public
 */
export const MenuDivider = forwardRef(function MenuDivider(
  props: HTMLProps<HTMLHRElement>,
  ref: React.ForwardedRef<HTMLHRElement>,
) {
  const {className, ...restProps} = props

  return <hr {...restProps} className={composeClassNames(className, menuDivider())} ref={ref} />
})

MenuDivider.displayName = 'MenuDivider'
