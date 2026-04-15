import {EllipsisHorizontalIcon} from '@sanity/icons'
import {Box, Breadcrumbs, Button, Flex, SPACE, Text} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

const items = ['List 1', 'List 2', 'List 3', 'List 4', 'List 5', 'List 6', 'List 7']

const MAX_LENGTH_OPTIONS = [undefined, ...items.map((_, index) => index + 1)]

export default function ExampleStory(): React.JSX.Element {
  const maxLength = useSelect('Max. length', MAX_LENGTH_OPTIONS)
  const gap = useSelect('Gap', [undefined, ...SPACE])

  return (
    <CardWrapper>
      <Flex align="center" height="fill" justify="center">
        <Breadcrumbs
          expandButton={{
            icon: EllipsisHorizontalIcon,
            padding: 2,
            text: undefined,
          }}
          gap={gap}
          maxLength={maxLength}
          popover={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: 1,
            placement: 'bottom',
          }}
          separator={
            <Box paddingY={2}>
              <Text muted size={1} style={{opacity: 0.5}}>
                /
              </Text>
            </Box>
          }
        >
          {items.map((item) => (
            <Button key={item} mode="bleed" padding={2} text={item} />
          ))}
        </Breadcrumbs>
      </Flex>
    </CardWrapper>
  )
}
