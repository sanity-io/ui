import {Box, Card, Text} from '@sanity/ui'
import {useAction, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_SPACE_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 0)

  return (
    <Box padding={[4, 5, 6]}>
      <Card border tone="inherit">
        <Box padding={padding} onClick={useAction('onClick')}>
          <Text>
            Box with <code>padding={padding}</code>
          </Text>
        </Box>
      </Card>
    </Box>
  )
}
