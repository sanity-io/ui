import {CropIcon} from '@sanity/icons'
import {Badge, Box, Flex, KBD, Stack, Text, useRootTheme} from '@sanity/ui'
import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_STATE_TONES,
  THEME_COLOR_STATES,
  ThemeColorCard_v2,
  ThemeColorCardToneKey,
  ThemeColorScheme_v2,
  ThemeColorSchemeKey,
  ThemeColorState_v2,
} from '@sanity/ui/theme'
import {CSSProperties} from 'react'

interface Features {
  base: boolean
  button: boolean
  schemes: ThemeColorSchemeKey[]
  selectable: boolean
  tones: ThemeColorCardToneKey[]
}

const FEATURES: Features = {
  base: true,
  button: false,
  schemes: ['light', 'dark'],
  selectable: false,
  tones: ['default'],
}

export function DebugStory() {
  const {color} = useRootTheme().theme.v2!

  return (
    <Flex>
      {FEATURES.schemes.map((scheme) => (
        <DebugScheme features={FEATURES} key={scheme} scheme={color[scheme]} />
      ))}
    </Flex>
  )
}

function DebugScheme(props: {features: Features; scheme: ThemeColorScheme_v2}) {
  const {features, scheme} = props

  return (
    <Box flex={1} style={{backgroundColor: scheme.default.bg}}>
      {features.tones.map((tone) => (
        <DebugCard card={scheme[tone]} features={features} key={tone} />
      ))}
    </Box>
  )
}

function DebugCard(props: {card: ThemeColorCard_v2; features: Features}) {
  const {card, features} = props

  return (
    <Box style={getStateVars(card)}>
      {features.base && <DebugState />}

      {features.button && (
        // oxlint-disable-next-line no-deprecated
        <Stack padding={2} space={1}>
          {THEME_COLOR_BUTTON_MODES.map((mode) => (
            // oxlint-disable-next-line no-deprecated
            <Stack key={mode} space={1}>
              {THEME_COLOR_STATE_TONES.map((stateTone) => (
                <Flex key={stateTone} gap={1}>
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
        // oxlint-disable-next-line no-deprecated
        <Stack padding={2} space={1}>
          {THEME_COLOR_STATE_TONES.map((stateTone) => (
            <Flex key={stateTone} gap={1}>
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

const AVATAR_COLORS = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'magenta',
] as const

function DebugState() {
  return (
    <Stack
      overflow="auto"
      padding={4}
      // oxlint-disable-next-line no-deprecated
      space={3}
      style={{border: '1px solid var(--card-border-color)'}}
    >
      <Flex gap={3}>
        <Text size={1}>Text</Text>
        <Text size={1}>
          <CropIcon />
        </Text>
      </Flex>
      <Box padding={1} style={{backgroundColor: 'var(--card-muted-bg-color)'}}>
        <Text muted size={1}>
          Muted
        </Text>
      </Box>
      <Text accent size={1}>
        Accent
      </Text>
      <Text size={1}>
        <a href="#" style={{color: 'var(--card-link-fg-color)'}}>
          Link
        </a>
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
      <Flex>
        <Box
          flex={1}
          paddingBottom={3}
          style={{backgroundColor: 'var(--card-skeleton-from-color)'}}
        />
        <Box
          flex={1}
          paddingBottom={3}
          style={{backgroundColor: 'var(--card-skeleton-to-color)'}}
        />
      </Flex>
      <Flex style={{gap: 1}}>
        {AVATAR_COLORS.map((color) => (
          <Box
            flex={1}
            key={color}
            overflow="hidden"
            padding={1}
            style={
              // oxlint-disable-next-line no-unsafe-type-assertion
              {
                '--card-fg-color': `var(--card-avatar-${color}-fg-color)`,
                'backgroundColor': `var(--card-avatar-${color}-bg-color)`,
              } as any
            }
          >
            <Text size={1} weight="bold">
              A
            </Text>
          </Box>
        ))}
      </Flex>
    </Stack>
  )
}

function getStateVars(state: ThemeColorState_v2) {
  return {
    '--card-accent-fg-color': state.accent.fg,

    '--card-avatar-gray-bg-color': state.avatar.gray.bg,
    '--card-avatar-gray-fg-color': state.avatar.gray.fg,
    '--card-avatar-red-bg-color': state.avatar.red.bg,
    '--card-avatar-red-fg-color': state.avatar.red.fg,
    '--card-avatar-orange-bg-color': state.avatar.orange.bg,
    '--card-avatar-orange-fg-color': state.avatar.orange.fg,
    '--card-avatar-yellow-bg-color': state.avatar.yellow.bg,
    '--card-avatar-yellow-fg-color': state.avatar.yellow.fg,
    '--card-avatar-green-bg-color': state.avatar.green.bg,
    '--card-avatar-green-fg-color': state.avatar.green.fg,
    '--card-avatar-cyan-bg-color': state.avatar.cyan.bg,
    '--card-avatar-cyan-fg-color': state.avatar.cyan.fg,
    '--card-avatar-blue-bg-color': state.avatar.blue.bg,
    '--card-avatar-blue-fg-color': state.avatar.blue.fg,
    '--card-avatar-purple-bg-color': state.avatar.purple.bg,
    '--card-avatar-purple-fg-color': state.avatar.purple.fg,
    '--card-avatar-magenta-bg-color': state.avatar.magenta.bg,
    '--card-avatar-magenta-fg-color': state.avatar.magenta.fg,

    '--card-badge-default-bg-color': state.badge.default.bg,
    '--card-badge-default-dot-color': state.badge.default.dot,
    '--card-badge-default-fg-color': state.badge.default.fg,
    '--card-badge-default-icon-color': state.badge.default.icon,

    '--card-badge-neutral-bg-color': state.badge.neutral.bg,
    '--card-badge-neutral-dot-color': state.badge.neutral.dot,
    '--card-badge-neutral-fg-color': state.badge.neutral.fg,
    '--card-badge-neutral-icon-color': state.badge.neutral.icon,

    '--card-badge-primary-bg-color': state.badge.primary.bg,
    '--card-badge-primary-dot-color': state.badge.primary.dot,
    '--card-badge-primary-fg-color': state.badge.primary.fg,
    '--card-badge-primary-icon-color': state.badge.primary.icon,

    '--card-badge-suggest-bg-color': state.badge.suggest.bg,
    '--card-badge-suggest-dot-color': state.badge.suggest.dot,
    '--card-badge-suggest-fg-color': state.badge.suggest.fg,
    '--card-badge-suggest-icon-color': state.badge.suggest.icon,

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

    '--card-bg-color': state.bg,

    '--card-border-color': state.border,

    '--card-code-bg-color': state.code.bg,
    '--card-code-fg-color': state.code.fg,

    '--card-fg-color': state.fg,

    '--card-icon-color': state.icon,

    '--card-kbd-bg-color': state.kbd.bg,
    '--card-kbd-border-color': state.kbd.border,
    '--card-kbd-fg-color': state.kbd.fg,

    '--card-link-fg-color': state.link.fg,

    '--card-muted-bg-color': state.muted.bg,
    '--card-muted-fg-color': state.muted.fg,

    '--card-skeleton-from-color': state.skeleton.from,
    '--card-skeleton-to-color': state.skeleton.to,

    'backgroundColor': 'var(--card-bg-color)',
    'color': 'var(--card-fg-color)',
  } as CSSProperties
}
