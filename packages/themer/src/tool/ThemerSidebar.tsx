import {COLOR_TINTS, ColorTintKey} from '@sanity/color'
import {ClipboardIcon} from '@sanity/icons/Clipboard'
import {CloseIcon} from '@sanity/icons/Close'
import {ResetIcon} from '@sanity/icons/Reset'
import {Box, Button, Card, Flex, Grid, Stack, Text} from '@sanity/ui'
import {Code} from '@sanity/ui/code'
import {useToast} from '@sanity/ui/toast'
import {registerLanguage} from 'react-refractor'
import typescript from 'refractor/typescript'
import {styled} from 'styled-components'

import {buildPalette} from '../theme/buildPalette'
import {BuildThemeOptions, resolveThemeOptions} from '../theme/options'
import {presets, ThemePreset} from '../theme/presets'
import {useThemer} from './context'
import {sameOptions} from './options'
import {createThemeSnippet} from './snippet'

// `Code` only highlights languages the surrounding app has registered with
// react-refractor, and the Studio registers its own set from an async import
// during startup — a race this sidebar keeps losing. Registering the one
// language the snippet needs keeps it highlighted from the first render.
registerLanguage(typescript)

/**
 * `<input type="color">` paints the color into a shadow-DOM swatch that brings
 * its own border and padding, which then sits inside ours as a second border.
 * Stripping that chrome leaves the themed border as the only one.
 */
const Swatch = styled.input`
  box-sizing: border-box;
  flex: none;
  width: 33px;
  height: 33px;
  padding: 0;
  border: 1px solid var(--card-border-color);
  border-radius: 4px;
  background: none;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 3px;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 3px;
  }
`

/** A native range input, themed through `accent-color` */
const Range = styled.input`
  display: block;
  width: 100%;
  margin: 0;
  accent-color: var(--card-focus-ring-color);
`

/**
 * The themer sidebar: presets, the accent/text/background pickers and the
 * contrast slider that generate the previewed `buildTheme` theme, plus the
 * `buildTheme` snippet to make it permanent.
 *
 * @internal
 */
export function ThemerSidebar() {
  const {baseOptions, options, setOptions, setOpen} = useThemer()
  const toast = useToast()

  const active = options ?? baseOptions
  const resolved = resolveThemeOptions(active)
  const palette = buildPalette(active)
  const activePresetSlug = presets.find((preset) => sameOptions(preset.options, active))?.slug ?? ''
  const snippet = createThemeSnippet(active)

  const patch = (changes: Partial<BuildThemeOptions>) => {
    setOptions({...active, ...changes})
  }

  const patchBackground = (changes: {dark?: string; light?: string}) => {
    setOptions({...active, background: {...active.background, ...changes}})
  }

  const clearField = (field: 'text' | 'contrast') => {
    const next = {...active}

    delete next[field]
    setOptions(next)
  }

  const clearBackground = (key: 'dark' | 'light') => {
    const background = {...active.background}

    delete background[key]

    const next = {...active}

    if (background.dark === undefined && background.light === undefined) {
      delete next.background
    } else {
      next.background = background
    }

    setOptions(next)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      toast.push({status: 'success', title: 'Copied theme to the clipboard'})
    } catch {
      toast.push({status: 'error', title: 'Could not copy the theme'})
    }
  }

  return (
    <Card height="fill">
      <Flex direction="column" height="fill">
        <Card borderBottom padding={3}>
          <Flex align="center" gap={2}>
            <Box flex={1} paddingLeft={1}>
              <Text size={1} weight="semibold">
                Themer
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
          <Stack gap={4}>
            <Stack gap={3}>
              <Text size={1} weight="medium">
                Presets
              </Text>
              <Grid gap={2} gridTemplateColumns={2}>
                {presets.map((preset) => (
                  <PresetButton
                    active={preset.slug === activePresetSlug}
                    key={preset.slug}
                    onClick={() => setOptions(preset.options)}
                    preset={preset}
                  />
                ))}
              </Grid>
            </Stack>

            <Stack gap={3}>
              <Text size={1} weight="medium">
                Colors
              </Text>
              <Stack gap={4}>
                <ColorRow
                  onChange={(accent) => patch({accent})}
                  tints={palette.blue}
                  title="Accent"
                  value={resolved.accent}
                />
                <ColorRow
                  auto={active.text === undefined}
                  onChange={(text) => patch({text})}
                  onClear={() => clearField('text')}
                  tints={palette.gray}
                  title="Text"
                  value={resolved.text}
                />
                <ColorRow
                  adjusted={palette.black}
                  auto={active.background?.dark === undefined}
                  onChange={(dark) => patchBackground({dark})}
                  onClear={() => clearBackground('dark')}
                  title="Background · dark"
                  value={resolved.background.dark}
                />
                <ColorRow
                  adjusted={palette.white}
                  auto={active.background?.light === undefined}
                  onChange={(light) => patchBackground({light})}
                  onClear={() => clearBackground('light')}
                  title="Background · light"
                  value={resolved.background.light}
                />
              </Stack>
            </Stack>

            <Stack gap={3}>
              <Flex align="center" gap={2}>
                <Stack flex={1} gap={2}>
                  <Text size={1} weight="medium">
                    Contrast
                  </Text>
                  <Text muted size={0}>
                    {resolved.contrast}
                    {active.contrast === undefined ? ' · auto' : ''}
                  </Text>
                </Stack>
                {active.contrast !== undefined && (
                  <Button
                    icon={ResetIcon}
                    mode="bleed"
                    onClick={() => clearField('contrast')}
                    padding={2}
                    title="Reset to auto"
                  />
                )}
              </Flex>
              <Range
                aria-label="Contrast"
                max={100}
                min={15}
                onChange={(event) => patch({contrast: Number(event.currentTarget.value)})}
                step={1}
                type="range"
                value={resolved.contrast}
              />
              <Text muted size={0}>
                100 keeps text and borders neutral — lower values blend in the accent
              </Text>
            </Stack>

            <Stack gap={3}>
              <Text size={1} weight="medium">
                Add to your config
              </Text>
              <Card border overflow="auto" padding={2} radius={2} tone="transparent">
                <Code language="ts" size={0}>
                  {snippet}
                </Code>
              </Card>
              <Flex gap={2}>
                <Button
                  icon={ClipboardIcon}
                  mode="ghost"
                  onClick={() => void handleCopy()}
                  text="Copy"
                />
                <Button
                  disabled={options === null}
                  icon={ResetIcon}
                  mode="ghost"
                  onClick={() => setOptions(null)}
                  text="Reset"
                  tone="critical"
                />
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Card>
  )
}

const paletteStyle: React.CSSProperties = {
  display: 'flex',
  // The gaps let the border color through, so a near-white light background
  // still reads as a swatch rather than a hole in the palette
  gap: 1,
  background: 'var(--card-border-color)',
  height: 21,
  borderRadius: 3,
  overflow: 'hidden',
  boxShadow: 'inset 0 0 0 1px var(--card-border-color)',
}

/** A little palette of the colors a preset would apply */
function PresetButton(props: {active: boolean; onClick: () => void; preset: ThemePreset}) {
  const {active, onClick, preset} = props

  const resolved = resolveThemeOptions(preset.options)

  const swatches = [
    ['accent', resolved.accent],
    ['text', resolved.text],
    ['dark', resolved.background.dark],
    ['light', resolved.background.light],
  ] as const

  return (
    <Button mode="ghost" onClick={onClick} padding={2} selected={active} title={preset.title}>
      <Stack as="span" gap={2}>
        <span style={paletteStyle}>
          {swatches.map(([key, background]) => (
            <span key={key} style={{flex: 1, background}} />
          ))}
        </span>
        <Text align="left" size={1} textOverflow="ellipsis">
          {preset.title}
        </Text>
      </Stack>
    </Button>
  )
}

const rampStyle: React.CSSProperties = {
  ...paletteStyle,
  height: 13,
  borderRadius: 2,
}

/**
 * One color of the theme: a swatch with its value, an optional reset-to-auto
 * button, and the generated 50–950 tint ramp for the scales it anchors.
 */
function ColorRow(props: {
  /** The color the generator actually applied, when it may differ from the input */
  adjusted?: string
  /** Whether the value is derived rather than explicitly set */
  auto?: boolean
  onChange: (value: string) => void
  onClear?: () => void
  /** The generated tint ramp this color anchors */
  tints?: Record<ColorTintKey, string>
  title: string
  value: string
}) {
  const {adjusted, auto, onChange, onClear, tints, title, value} = props

  return (
    <Stack gap={2}>
      <Flex align="center" gap={2}>
        <Stack flex={1} gap={2}>
          <Text size={1}>{title}</Text>
          <Text muted size={0} textOverflow="ellipsis">
            {value}
            {adjusted !== undefined && adjusted !== value ? ` → ${adjusted}` : ''}
            {auto ? ' · auto' : ''}
          </Text>
        </Stack>
        {onClear && !auto && (
          <Button
            icon={ResetIcon}
            mode="bleed"
            onClick={onClear}
            padding={2}
            title="Reset to auto"
          />
        )}
        <Swatch
          aria-label={`${title} color`}
          onChange={(event) => onChange(event.currentTarget.value)}
          type="color"
          value={value}
        />
      </Flex>
      {tints && (
        <span style={rampStyle}>
          {COLOR_TINTS.map((tint) => (
            <span key={tint} style={{flex: 1, background: tints[tint]}} />
          ))}
        </span>
      )}
    </Stack>
  )
}
