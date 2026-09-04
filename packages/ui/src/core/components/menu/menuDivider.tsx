import {clsx} from 'clsx/lite'

import {ElementType, EmptyProps, Props} from '../../types/component'

import {menuDivider} from './menuDivider.css'

/**
 * @public
 */
export type MenuDividerProps<E extends ElementType = 'hr'> = Props<EmptyProps, E>

function MenuDividerComponent(
  props: {as?: ElementType} & Omit<React.HTMLProps<HTMLHRElement>, 'as'>,
) {
  const {as = 'hr', className, ref, ...restProps} = props
  // Rendering the polymorphic `as` needs one concrete element type for JSX to
  // type-check the hr-flavored props (the same widening styled-components'
  // `as` prop performed here before).
  // oxlint-disable-next-line no-unsafe-type-assertion
  const Component = as as 'hr'

  return <Component className={clsx(menuDivider, className)} ref={ref} {...restProps} />
}

/**
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const MenuDivider = MenuDividerComponent as unknown as <E extends ElementType = 'hr'>(
  props: MenuDividerProps<E>,
) => React.JSX.Element
