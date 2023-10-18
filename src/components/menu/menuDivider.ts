import styled from 'styled-components'
import {cssVars} from '../../theme'

/**
 * @public
 */
export const MenuDivider = styled.hr`
  height: 1px;
  border: 0;
  background: ${cssVars.default['border-base']};
  margin: 0;
`
