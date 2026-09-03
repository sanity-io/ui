import {styled} from 'styled-components'

import {Button} from '../../primitives/button/button'

// Stays on styled-components: `margin: -4px` has to beat Button's runtime
// `margin: 0` at the same specificity, which only holds while both rules live
// in the runtime stylesheet.
export const ExpandButton = styled(Button)`
  appearance: none;
  margin: -4px;
`
