import {styled} from 'styled-components'

import {ElementType, EmptyProps, Props} from '../../types'

const StyledMenuDivider = styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`

/**
 * @public
 */
export type MenuDividerProps<E extends ElementType = 'hr'> = Props<EmptyProps, E>

/**
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const MenuDivider = StyledMenuDivider as unknown as <E extends ElementType = 'hr'>(
  props: MenuDividerProps<E>,
) => React.JSX.Element
