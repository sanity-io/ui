/* eslint-disable @typescript-eslint/no-explicit-any */

import {CropIcon} from '@sanity/icons'
import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorCardToneKey,
  ThemeColorCard_v2,
  ThemeColorSchemeKey,
  ThemeColorScheme_v2,
  ThemeColorState_v2,
} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {CSSProperties, useMemo} from 'react'
import {Badge, Box, Flex, KBD, Stack, Text} from '../../../primitives'
import {useRootTheme} from '../../useRootTheme'

interface Features {
  base: boolean
  button: boolean
  schemes: ThemeColorSchemeKey[]
  selectable: boolean
  tones: ThemeColorCardToneKey[]
}

const SCHEME_OPTIONS: {[key: string]: ThemeColorSchemeKey | 'all'} = {
  All: 'all',
  Dark: 'dark',
  Light: 'light',
}

const TONE_OPTIONS: {[key: string]: ThemeColorCardToneKey | 'all'} = {
  All: 'all',
  Transparent: 'transparent',
  Default: 'default',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

export default function DebugStory() {
  const {color} = useRootTheme().theme.v2!

  const scheme = useSelect('Color scheme', SCHEME_OPTIONS, 'all', 'Props') || 'all'
  const tone = useSelect('Tone', TONE_OPTIONS, 'default', 'Props') || 'all'

  const base = useBoolean('Base', true, 'Props') || false
  const button = useBoolean('Button', false, 'Props') || false
  const selectable = useBoolean('Selectable', false, 'Props') || false

  const features: Features = useMemo(
    () => ({
      base,
      button,
      schemes: scheme == 'all' ? ['light', 'dark'] : [scheme],
      selectable,
      tones: tone == 'all' ? ['transparent', 'default'] : [tone],
    }),
    [base, button, scheme, selectable, tone],
  )

  return (
    <Flex>
      {features.schemes.map((scheme) => (
        <DebugScheme features={features} key={scheme} scheme={color[scheme]} />
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
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-gray-fg-color)',
              backgroundColor: 'var(--card-avatar-gray-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-red-fg-color)',
              backgroundColor: 'var(--card-avatar-red-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-orange-fg-color)',
              backgroundColor: 'var(--card-avatar-orange-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-yellow-fg-color)',
              backgroundColor: 'var(--card-avatar-yellow-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-green-fg-color)',
              backgroundColor: 'var(--card-avatar-green-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-cyan-fg-color)',
              backgroundColor: 'var(--card-avatar-cyan-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-blue-fg-color)',
              backgroundColor: 'var(--card-avatar-blue-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-purple-fg-color)',
              backgroundColor: 'var(--card-avatar-purple-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
        <Box
          flex={1}
          overflow="hidden"
          padding={1}
          style={
            {
              '--card-fg-color': 'var(--card-avatar-magenta-fg-color)',
              backgroundColor: 'var(--card-avatar-magenta-bg-color)',
            } as any
          }
        >
          <Text size={1} weight="bold">
            A
          </Text>
        </Box>
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

    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--card-fg-color)',
  } as CSSProperties
}
