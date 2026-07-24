import {styled} from 'styled-components'

import {ElementType, EmptyProps, Props} from '../../types'

/**
 * @public
 */
export type MenuDividerProps<E extends ElementType = 'hr'> = Props<EmptyProps, E>

/**
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const MenuDivider = styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
` as unknown as <E extends ElementType = 'hr'>(props: MenuDividerProps<E>) => React.JSX.Element
