import {Box, Card, Popover, Text, usePrefersDark} from '@sanity/ui'

export default function PortalInheritanceStory() {
  const dark = usePrefersDark()

  return (
    <Card padding={5} scheme={dark ? 'light' : 'dark'}>
      <Box display="flex">
        <Popover content={<Text>Within portal</Text>} open padding={4} portal>
          <Text>Flipped scheme</Text>
        </Popover>
      </Box>
    </Card>
  )
}
