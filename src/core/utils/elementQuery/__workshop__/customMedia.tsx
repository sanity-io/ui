import {Box, Card, ElementQuery, Text} from '@sanity/ui'
import {varNames, vars} from '@sanity/ui/css'
import {styled} from 'styled-components'

const TestCard = styled(Card)`
  [data-eq-min~='0'] > & {
    ${varNames.color.fg}: light-dark(${vars.palette.orange[600]}, ${vars.palette.orange[400]});
  }

  [data-eq-min~='1'] > & {
    ${varNames.color.fg}: light-dark(${vars.palette.red[600]}, ${vars.palette.red[400]});
  }

  [data-eq-min~='2'] > & {
    ${varNames.color.fg}: light-dark(${vars.palette.magenta[600]}, ${vars.palette.magenta[400]});
  }

  [data-eq-min~='3'] > & {
    ${varNames.color.fg}: light-dark(${vars.palette.purple[600]}, ${vars.palette.purple[400]});
  }
`

export default function CustomMediaQuery() {
  return (
    <Box padding={4}>
      <Box marginBottom={4}>
        <Text>Resize this frame to see the text color change:</Text>
      </Box>

      <ElementQuery media={[0, 100, 200, 300]}>
        <TestCard padding={3} shadow={1}>
          <Text>This card sits inside an element query.</Text>
        </TestCard>
      </ElementQuery>
    </Box>
  )
}
