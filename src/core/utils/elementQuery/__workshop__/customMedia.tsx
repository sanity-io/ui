import {Box, Card, ElementQuery, Text} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {styled} from 'styled-components'

const TestCard = styled(Card)`
  [data-eq-min~='0'] > & {
    ${vars.color.fg.slice(4, -1)}: light-dark(${vars.color.palette.orange[600]}, ${vars.color
      .palette.orange[400]});
  }

  [data-eq-min~='1'] > & {
    ${vars.color.fg.slice(4, -1)}: light-dark(${vars.color.palette.red[600]}, ${vars.color.palette
      .red[400]});
  }

  [data-eq-min~='2'] > & {
    ${vars.color.fg.slice(4, -1)}: light-dark(${vars.color.palette.magenta[600]}, ${vars.color
      .palette.magenta[400]});
  }

  [data-eq-min~='3'] > & {
    ${vars.color.fg.slice(4, -1)}: light-dark(${vars.color.palette.purple[600]}, ${vars.color
      .palette.purple[400]});
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
