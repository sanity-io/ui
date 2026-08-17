import {styled} from 'styled-components'

import {Box} from '../../primitives/box/box'

/**
 * @internal
 */
export const StyledAutocomplete = styled.div`
  line-height: 0;
`

/**
 * @internal
 */
export const ListBox = styled(Box)`
  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`
