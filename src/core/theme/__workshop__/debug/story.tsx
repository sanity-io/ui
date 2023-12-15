import {CropIcon} from '@sanity/icons'
import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_SCHEMES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorCard_v2,
  ThemeColorScheme_v2,
  ThemeColorState_v2,
} from '@sanity/ui/theme'
import {useBoolean} from '@sanity/ui-workshop'
import {CSSProperties} from 'react'
import {Badge, Box, Flex, KBD, Stack, Text} from '../../../primitives'
import {useRootTheme} from '../../useRootTheme'

export default function DebugStory() {
  const {color} = useRootTheme().theme.v2!

  return (
    <Flex>
      {THEME_COLOR_SCHEMES.map((scheme) => (
        <DebugScheme key={scheme} scheme={color[scheme]} />
      ))}
    </Flex>
  )
}

function DebugScheme(props: {scheme: ThemeColorScheme_v2}) {
  const {scheme} = props

  const button = useBoolean('Button', false, 'Props') || false
  const selectable = useBoolean('Selectable', false, 'Props') || false

  return (
    <Box flex={1} style={{backgroundColor: scheme.default.bg}}>
      {THEME_COLOR_CARD_TONES.map((tone) => (
        <DebugCard card={scheme[tone]} features={{button, selectable}} key={tone} />
      ))}
    </Box>
  )
}

function DebugCard(props: {
  card: ThemeColorCard_v2
  features: {button: boolean; selectable: boolean}
}) {
  const {card, features} = props

  // card.avatar
  // card.backdrop
  // card.badge
  // card.button
  // card.focusRing
  // card.icon
  // card.input
  // card.kbd
  // card.link
  // card.selectable
  // card.shadow
  // card.skeleton
  // card.syntax

  return (
    <Box style={getStateVars(card)}>
      <DebugState />

      {features.button && (
        <Stack padding={2} space={1}>
          {THEME_COLOR_BUTTON_MODES.map((mode) => (
            <Stack key={mode} space={1}>
              {THEME_COLOR_STATE_TONES.map((stateTone) => (
                <Flex key={stateTone} gap={1}>
                  {/* {mode} */}
                  {THEME_COLOR_STATES.map((state) => (
                    <Box
                      flex={1}
                      key={state}
                      style={getStateVars(card.button[mode][stateTone][state])}
                    >
                      <DebugState />
                    </Box>
                  ))}
                </Flex>
              ))}
            </Stack>
          ))}
        </Stack>
      )}

      {features.selectable && (
        <Stack padding={2} space={1}>
          {THEME_COLOR_STATE_TONES.map((stateTone) => (
            <Flex key={stateTone} gap={1}>
              {/* {mode} */}
              {THEME_COLOR_STATES.map((state) => (
                <Box flex={1} key={state} style={getStateVars(card.selectable[stateTone][state])}>
                  <DebugState />
                </Box>
              ))}
            </Flex>
          ))}
        </Stack>
      )}
    </Box>
  )
}

function DebugState() {
  return (
    <Stack
      overflow="auto"
      padding={4}
      space={3}
      style={{border: '1px solid var(--card-border-color)'}}
    >
      <Flex gap={3}>
        <Text size={1}>Text</Text>
        <Text size={1}>
          <CropIcon />
        </Text>
      </Flex>
      <Text muted size={1}>
        Muted
      </Text>
      <Text accent size={1}>
        Accent
      </Text>
      <Text size={1}>
        <code>Code</code>
      </Text>
      <div>
        <KBD>Cmd</KBD>
      </div>
      <Flex gap={1}>
        {THEME_COLOR_STATE_TONES.map((stateTone) => (
          <Box flex="none" key={stateTone}>
            <Badge tone={stateTone}>{stateTone}</Badge>
          </Box>
        ))}
      </Flex>
      <div style={{borderBottom: '1px solid var(--card-border-color)'}} />
    </Stack>
  )
}

function getStateVars(state: ThemeColorState_v2) {
  return {
    '--card-accent-fg-color': state.accent.fg,

    '--card-code-bg-color': state.code.bg,
    '--card-code-fg-color': state.code.fg,

    '--card-bg-color': state.bg,

    '--card-border-color': state.border,

    '--card-fg-color': state.fg,

    '--card-icon-color': state.icon,

    '--card-muted-fg-color': state.muted.fg,

    '--card-kbd-bg-color': state.kbd.bg,
    '--card-kbd-border-color': state.kbd.border,
    '--card-kbd-fg-color': state.kbd.fg,

    '--card-badge-default-bg-color': state.badge.default.bg,
    '--card-badge-default-dot-color': state.badge.default.dot,
    '--card-badge-default-fg-color': state.badge.default.fg,
    '--card-badge-default-icon-color': state.badge.default.icon,

    '--card-badge-primary-bg-color': state.badge.primary.bg,
    '--card-badge-primary-dot-color': state.badge.primary.dot,
    '--card-badge-primary-fg-color': state.badge.primary.fg,
    '--card-badge-primary-icon-color': state.badge.primary.icon,

    '--card-badge-positive-bg-color': state.badge.positive.bg,
    '--card-badge-positive-dot-color': state.badge.positive.dot,
    '--card-badge-positive-fg-color': state.badge.positive.fg,
    '--card-badge-positive-icon-color': state.badge.positive.icon,

    '--card-badge-caution-bg-color': state.badge.caution.bg,
    '--card-badge-caution-dot-color': state.badge.caution.dot,
    '--card-badge-caution-fg-color': state.badge.caution.fg,
    '--card-badge-caution-icon-color': state.badge.caution.icon,

    '--card-badge-critical-bg-color': state.badge.critical.bg,
    '--card-badge-critical-dot-color': state.badge.critical.dot,
    '--card-badge-critical-fg-color': state.badge.critical.fg,
    '--card-badge-critical-icon-color': state.badge.critical.icon,

    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--card-fg-color)',
  } as CSSProperties
}
