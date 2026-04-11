import {Box, Card, ElementQuery, Text} from '@sanity/ui'

import {testCard} from './styles.css'

export default function CustomMediaQuery(): React.JSX.Element {
  return (
    <Box padding={4}>
      <Box marginBottom={4}>
        <Text>Resize this frame to see the text color change:</Text>
      </Box>

      <ElementQuery media={[0, 100, 200, 300]}>
        <Card className={testCard} padding={3} shadow={1}>
          <Text>This card sits inside an element query.</Text>
        </Card>
      </ElementQuery>
    </Box>
  )
}
