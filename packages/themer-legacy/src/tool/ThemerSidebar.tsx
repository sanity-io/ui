import {COLOR_TINTS} from '@sanity/color'
import {CloseIcon} from '@sanity/icons/Close'
import {CollapseIcon} from '@sanity/icons/Collapse'
import {ResetIcon} from '@sanity/icons/Reset'
import {SplitVerticalIcon} from '@sanity/icons/SplitVertical'
import {Box, Button, Card, Flex, Grid, Label, Stack, Text} from '@sanity/ui'
import {useMemo} from 'react'
import {styled} from 'styled-components'

import {createTonesFromHues} from '../generator/createTonesFromHues'
import {hues as defaultHues} from '../generator/defaults'
import {presets} from '../generator/presets'
import {ThemePreset} from '../generator/types'
import {useThemer} from './context'
import {HueFields} from './HueFields'
import {HUE_KEYS, sameHues} from './hues'
import {TOOL_TITLE} from './ThemerNavbar'

/**
 * The themer sidebar: the view toggle, the hosted Themer's presets, and the
 * six hue editors that generate the previewed `createTheme` theme.
 *
 * @internal
 */
export function ThemerSidebar() {
  const {hues, setHues, updateHue, view, setView, setOpen} = useThemer()

  // Until the first edit the Studio previews its configured theme, and the
  // editors show the default preset — what the hosted Themer opened with
  const active = hues ?? defaultHues
  const activePresetSlug = presets.find((preset) => sameHues(preset.hues, active))?.slug

  return (
    <Card borderLeft height="fill">
      <Flex direction="column" height="fill">
        <Card borderBottom padding={3}>
          <Flex align="center" gap={2}>
            <Box flex={1} paddingLeft={1}>
              <Text size={1} weight="semibold">
                {TOOL_TITLE}
              </Text>
            </Box>
            <Button
              icon={CloseIcon}
              mode="bleed"
              onClick={() => setOpen(false)}
              padding={2}
              title="Close themer"
            />
          </Flex>
        </Card>

        <Box flex={1} overflow="auto" padding={3}>
          <Stack gap={5}>
            <Grid gap={3} gridTemplateColumns={2}>
              <Stack gap={3}>
                <Label muted size={0}>
                  View
                </Label>
                <Button
                  fontSize={1}
                  icon={view === 'single' ? SplitVerticalIcon : CollapseIcon}
                  mode="ghost"
                  onClick={() => setView(view === 'single' ? 'split' : 'single')}
                  paddingX={3}
                  paddingY={2}
                  text={view === 'single' ? 'Split-screen' : 'Collapse'}
                />
              </Stack>
              <Stack gap={3}>
                <Label muted size={0}>
                  Draft
                </Label>
                <Button
                  disabled={hues === null}
                  fontSize={1}
                  icon={ResetIcon}
                  mode="ghost"
                  onClick={() => setHues(null)}
                  paddingX={3}
                  paddingY={2}
                  text="Reset"
                  tone="critical"
                />
              </Stack>
            </Grid>

            <Stack gap={3}>
              <Label muted size={0}>
                Presets
              </Label>
              <Grid gap={2} gridTemplateColumns={2}>
                {presets.map((preset) => (
                  <PresetButton
                    active={preset.slug === activePresetSlug}
                    key={preset.slug}
                    onClick={() => setHues(preset.hues)}
                    preset={preset}
                  />
                ))}
              </Grid>
            </Stack>

            <Stack gap={3}>
              <Label muted size={0}>
                Hues
              </Label>
              <Stack gap={3}>
                {HUE_KEYS.map((tone) => (
                  <HueFields hue={active[tone]} key={tone} onChange={updateHue} tone={tone} />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Card>
  )
}

const Palette = styled.span`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-auto-rows: 3px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--card-border-color);
`

/** The tint ramps of a preset's six hues, one strip per hue */
function PresetButton(props: {active: boolean; onClick: () => void; preset: ThemePreset}) {
  const {active, onClick, preset} = props
  const tones = useMemo(() => createTonesFromHues(preset.hues), [preset])

  return (
    <Button mode="ghost" onClick={onClick} padding={2} selected={active} title={preset.title}>
      <Stack as="span" gap={2}>
        <Palette>
          {HUE_KEYS.map((tone) =>
            COLOR_TINTS.map((tint) => (
              <span key={`${tone}-${tint}`} style={{background: tones[tone][tint].hex}} />
            )),
          )}
        </Palette>
        <Text align="left" size={1} textOverflow="ellipsis">
          {preset.title}
        </Text>
      </Stack>
    </Button>
  )
}
