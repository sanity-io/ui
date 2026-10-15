import {Button} from '../../primitives/button/button'
import {styled} from '../../styles/styled'

// Stays on styled-components: `margin: -4px` must beat Button's runtime
// `margin: 0` at equal specificity, which needs both rules in the runtime
// stylesheet.
export const ExpandButton = styled(Button)`
  margin: -4px;
`
