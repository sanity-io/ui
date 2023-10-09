import {Box, Card, ElementQuery, Text} from '@sanity/ui'
import styled from 'styled-components'
import {mutableCardVariables} from '../../../styles/colorVars'

const TestCard = styled(Card)`
  ${mutableCardVariables['fg-color']}: orange;

  [data-eq-min~='0'] > & {
    ${mutableCardVariables['fg-color']}: green;
  }

  [data-eq-min~='1'] > & {
    ${mutableCardVariables['fg-color']}: blue;
  }
`

export default function CustomMediaQuery() {
  return (
    <Box padding={[3, 4, 5]}>
      <Box marginBottom={[3, 4, 5]}>
        <Text>Resize this frame to see the text color change:</Text>
      </Box>

      <ElementQuery media={[100, 200, 300]}>
        <TestCard padding={2} shadow={1}>
          <Text>This card sits inside an element query.</Text>
        </TestCard>
      </ElementQuery>
    </Box>
  )
}
