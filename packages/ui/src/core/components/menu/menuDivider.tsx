import {styled} from 'styled-components'

import {ElementType, EmptyProps, Props} from '../../types/component'

/**
 * @public
 */
export type MenuDividerProps<E extends ElementType = 'hr'> = Props<EmptyProps, E>

const StyledMenuDivider = styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`

/**
 * @public
 */
function MenuDividerComponent(
  props: {as?: ElementType} & Omit<React.HTMLProps<HTMLHRElement>, 'as'>,
) {
  return <StyledMenuDivider data-ui="MenuDivider" {...props} />
}

// oxlint-disable-next-line no-unsafe-type-assertion
export const MenuDivider = MenuDividerComponent as unknown as <E extends ElementType = 'hr'>(
  props: MenuDividerProps<E>,
) => React.JSX.Element
