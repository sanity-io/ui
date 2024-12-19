import {ChevronRightIcon} from '@sanity/icons'
import {Box, Breadcrumbs, Button, Card, Flex, Text} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

const BREADCRUMBS_MAX_LENGTH_OPTIONS = {
  '(none)': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

export default function Example() {
  const maxLength =
    useSelect('Max. length', BREADCRUMBS_MAX_LENGTH_OPTIONS, 0, 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Card padding={1} radius={3} shadow={1}>
        <Breadcrumbs
          gapX={0}
          expandButton={{padding: 2}}
          maxLength={maxLength}
          separator={
            <Box paddingY={2} style={{opacity: 0.5}}>
              <Text muted size={1}>
                <ChevronRightIcon />
              </Text>
            </Box>
          }
          // space={0}
        >
          <Button href="#" mode="bleed" padding={2} text="Root" />
          <Button href="#" mode="bleed" padding={2} text="Category A of some length" />
          <Button href="#" mode="bleed" padding={2} text="Category B" />
          <Button href="#" mode="bleed" padding={2} text="Category C" />
          <Button
            href="#"
            mode="bleed"
            padding={2}
            text="Category D of an every larger and more extended length"
            textOverflow="none"
          />
          <Button href="#" mode="bleed" padding={2} text="Category E" />
          <Button href="#" mode="bleed" padding={2} text="Category F" />
          <Box padding={2}>
            <Text size={1} weight="semibold">
              Item
            </Text>
          </Box>
        </Breadcrumbs>
      </Card>
    </Flex>
  )
}
