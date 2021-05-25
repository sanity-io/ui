import {Icon, icons, IconSymbol} from '@sanity/icons'
import {Box, Card, Code, Grid, Heading, Stack} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('icons', 'Icons', [
  {name: 'overview', title: 'Overview', component: OverviewStory},
])

function OverviewStory() {
  return (
    <Card padding={[4, 5, 6]}>
      <Box>
        <Heading>Overview of Sanity icons</Heading>
      </Box>

      <Grid columns={[1, 1, 2, 3, 4, 5, 6]} gap={3} marginTop={[4, 5, 6]}>
        {Object.keys(icons).map((iconKey) => (
          <Card border key={iconKey} padding={4} radius={2}>
            <Stack space={4}>
              <Heading align="center">
                <Icon symbol={iconKey as IconSymbol} />
              </Heading>
              <Code style={{textAlign: 'center'}}>{iconKey}</Code>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Card>
  )
}
