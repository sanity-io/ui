import {EditIcon, PublishIcon} from '@sanity/icons'
import {Box, Card, Container, Flex, Inline, Stack, Text, ThemeProps, useRootTheme} from '@sanity/ui'
import {ThemeColorStateToneKey, getTheme_v2} from '@sanity/ui/theme'
import {useBoolean} from '@sanity/ui-workshop'
import styled, {css} from 'styled-components'

const TextWithTone = styled(Text)<{$tone: ThemeColorStateToneKey}>((
  props: {
    $tone: ThemeColorStateToneKey
  } & ThemeProps,
) => {
  const {$tone} = props
  const {color} = getTheme_v2(props.theme)
  const tone = color.button.default[$tone]

  return css`
    &:not([data-selected]) {
      --card-fg-color: ${tone.enabled.bg};
      --card-muted-fg-color: ${tone.enabled.bg};
    }

    [data-ui='Card']:disabled & {
      --card-fg-color: inherit;
      --card-muted-fg-color: inherit;
    }
  `
})

export default function SelectedStory() {
  const disabled = useBoolean('Disabled', false) || false
  const selected = useBoolean('Selected', false) || false

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <Stack space={1}>
          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
          >
            <Preview selected={selected} />
          </Card>

          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
            tone="critical"
          >
            <Preview selected={selected} />
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}

function Preview({selected}: {selected: boolean}) {
  const rootTheme = useRootTheme()

  return (
    <Flex>
      <Box flex={1}>
        <Text>Title</Text>
      </Box>
      <Inline space={3}>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={rootTheme.tone === 'default' ? 'caution' : 'default'}
        >
          <EditIcon />
        </TextWithTone>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={rootTheme.tone === 'default' ? 'positive' : 'default'}
        >
          <PublishIcon />
        </TextWithTone>
      </Inline>
    </Flex>
  )
}
