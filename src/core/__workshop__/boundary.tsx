import {Box, Button, Root, Stack, Text, useCard, useToast} from '@sanity/ui'

export default function BoundaryStory() {
  const {scheme} = useCard()

  return (
    <Box padding={5}>
      <Root as="div" padding={5} radius={4} scheme={scheme}>
        <Layout />
      </Root>
    </Box>
  )
}

function Layout() {
  const toast = useToast()

  return (
    <Stack gap={4}>
      <Text size={1}>
        Testing the root component. Toast messages will be rendered here, and should be contained
        within the root element.
      </Text>

      <Button onClick={() => toast.push({title: 'Hello!'})} text="Push toast message" width="min" />
    </Stack>
  )
}
