import {styled} from 'styled-components'

import {Button} from '../../primitives/button/button'

// Stays on styled-components: `margin: -4px` must beat Button's runtime
// `margin: 0` at equal specificity, which needs both rules in the runtime
// stylesheet.
export const ExpandButton = styled(Button)`
  appearance: none;
  margin: -4px;
`
