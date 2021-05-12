import {Box, Card, Text} from '@sanity/ui'
import {defineScope, useAction, useSelect} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('primitives/box', 'Box', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'responsive', title: 'Responsive', component: ResponsiveStory},
])

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

function PropsStory() {
  const padding = useSelect('Padding', SPACE_OPTIONS, 0, 'Props')

  return (
    <Box padding={[4, 5, 6]}>
      <Card border tone="inherit">
        <Box onClick={useAction('onClick')} padding={padding}>
          <Text>
            Box with <code>padding={padding}</code>
          </Text>
        </Box>
      </Card>
    </Box>
  )
}

function ResponsiveStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Box
        id="responsive-box"
        display={['none', 'block', 'none', 'block', 'none', 'block', 'none']}
        flex={[1, 2, 3, 4, 5, 6, 7]}
        padding={3}
        sizing={['content', 'border', 'content', 'border', 'content', 'border', 'content']}
        style={{outline: '1px solid var(--card-border-color)'}}
      >
        <Text align="center" muted>
          This is a box with responsive props
        </Text>
      </Box>
    </Box>
  )
}
