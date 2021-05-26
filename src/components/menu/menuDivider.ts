import styled, {StyledComponent} from 'styled-components'
import {Theme} from '../../theme'

export const MenuDivider: StyledComponent<'hr', Theme> = styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`
