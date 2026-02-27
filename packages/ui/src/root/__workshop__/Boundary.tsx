import {Button, Root, Stack, Text, useCard, useToast} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function BoundaryStory(): React.JSX.Element {
  const {scheme} = useCard()

  return (
    <CardWrapper pattern="halftone">
      <Root
        as="div"
        padding={4}
        radius={5}
        scheme={scheme}
        shadow={3}
        sizing="border"
        style={{minHeight: 300}}
      >
        <Layout />
      </Root>
    </CardWrapper>
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

      <Button
        mode="ghost"
        text="Push toast message"
        width="min"
        onClick={() => toast.push({title: 'Hello!'})}
      />
    </Stack>
  )
}
