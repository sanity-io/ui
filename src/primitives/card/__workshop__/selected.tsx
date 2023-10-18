import {EditIcon, PublishIcon} from '@sanity/icons'
import {
  Box,
  Card,
  Container,
  Flex,
  Inline,
  Stack,
  Text,
  ThemeColorToneKey,
  useRootTheme,
} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import styled, {css} from 'styled-components'
import {mutableCardVariables} from '../../../theme/lib/theme/color/cssVariables/cardVariables'
import {cssVars} from '../../../theme/lib/theme/color/cssVariables/createCssVars'

const TextWithTone = styled(Text)<{$tone: ThemeColorToneKey}>(({
  $tone,
}: {
  $tone: ThemeColorToneKey
}) => {
  return css`
    &:not([data-selected]) {
      ${mutableCardVariables['fg-color']}: ${$tone ? cssVars[$tone]['text-secondary'] : undefined};
      ${mutableCardVariables['muted-fg-color']} ${$tone
        ? cssVars[$tone]['text-secondary']
        : undefined};
    }

    [data-ui='Card']:disabled & {
      ${mutableCardVariables['fg-color']}: inherit;
      ${mutableCardVariables['muted-fg-color']} inherit;
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
  const theme = useRootTheme()

  return (
    <Flex>
      <Box flex={1}>
        <Text>Title</Text>
      </Box>
      <Inline space={3}>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={theme.tone === 'default' ? 'caution' : 'default'}
        >
          <EditIcon />
        </TextWithTone>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={theme.tone === 'default' ? 'positive' : 'default'}
        >
          <PublishIcon />
        </TextWithTone>
      </Inline>
    </Flex>
  )
}
