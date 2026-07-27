import {ClipboardIcon} from '@sanity/icons/Clipboard'
import {CloseIcon} from '@sanity/icons/Close'
import {ResetIcon} from '@sanity/icons/Reset'
import {Box, Button, Card, Code, Flex, Grid, Stack, Text, useToast} from '@sanity/ui'
import {registerLanguage} from 'react-refractor'
import typescript from 'refractor/typescript'

import {presets, ThemePreset} from '../presets'
import {COLOR_OPTION_KEYS, CreateThemeOptions} from '../types'
import {useThemer} from './context'
import {DEFAULT_COLORS, THEMER_FIELDS, ThemerField} from './fields'
import {createThemeSnippet} from './snippet'

// `Code` only highlights languages the surrounding app has registered with
// react-refractor, and the Studio registers its own set from an async import
// during startup — a race this sidebar keeps losing. Registering the one
// language the snippet needs keeps it highlighted from the first render.
registerLanguage(typescript)

const swatchStyle: React.CSSProperties = {
  width: 33,
  height: 33,
  padding: 0,
  border: '1px solid var(--card-border-color)',
  borderRadius: 6,
  background: 'transparent',
  cursor: 'pointer',
  flex: 'none',
}

function sameColors(a: CreateThemeOptions, b: CreateThemeOptions): boolean {
  return COLOR_OPTION_KEYS.every(
    (key) => (a[key]?.toLowerCase() ?? undefined) === (b[key]?.toLowerCase() ?? undefined),
  )
}

/** Expands `#abc` to `#aabbcc`, which is the only format `<input type="color">` accepts */
function expandHex(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }

  return hex
}

/**
 * The themer sidebar: a preset picker and the primary, text, light and dark
 * background color pickers that generate the previewed theme, plus the
 * `createTheme` snippet to make it permanent.
 *
 * @internal
 */
export function ThemerSidebar() {
  const {baseColors, colors, setColors, setOpen} = useThemer()
  const toast = useToast()

  const active = colors ?? baseColors
  const activePresetSlug = presets.find((preset) => sameColors(preset.colors, active))?.slug ?? ''
  const snippet = createThemeSnippet(active)

  const handleFieldChange = (key: keyof CreateThemeOptions, value: string | undefined) => {
    const next = {...active}

    if (value === undefined) {
      delete next[key]
    } else {
      next[key] = value
    }

    setColors(next)
  }

  const handlePresetChange = (slug: string) => {
    const preset = presets.find((candidate) => candidate.slug === slug)

    if (preset) {
      setColors({...preset.colors})
    }
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
                    onClick={handlePresetChange}
                    preset={preset}
                  />
                ))}
              </Grid>
            </Stack>

            <Stack gap={3}>
              {THEMER_FIELDS.map((field) => (
                <ColorField
                  field={field}
                  key={field.key}
                  onChange={handleFieldChange}
                  value={active[field.key]}
                />
              ))}
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
                  disabled={colors === null}
                  icon={ResetIcon}
                  mode="ghost"
                  onClick={() => setColors(null)}
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

/** A little color palette of the colors a preset would apply */
function PresetButton(props: {
  active: boolean
  onClick: (slug: string) => void
  preset: ThemePreset
}) {
  const {active, onClick, preset} = props

  return (
    <Button
      mode="ghost"
      onClick={() => onClick(preset.slug)}
      padding={2}
      selected={active}
      title={preset.title}
    >
      <Stack as="span" gap={2}>
        <span style={paletteStyle}>
          {COLOR_OPTION_KEYS.map((key) => (
            <span
              key={key}
              style={{flex: 1, background: preset.colors[key] ?? DEFAULT_COLORS[key]}}
            />
          ))}
        </span>
        <Text align="left" size={1} textOverflow="ellipsis">
          {preset.title}
        </Text>
      </Stack>
    </Button>
  )
}

function ColorField(props: {
  field: ThemerField
  value: string | undefined
  onChange: (key: keyof CreateThemeOptions, value: string | undefined) => void
}) {
  const {field, value, onChange} = props

  return (
    <Flex align="center" gap={2}>
      <Stack flex={1} gap={2}>
        <Text size={1} weight="medium">
          {field.title}
        </Text>
        <Text muted size={0}>
          {value ?? field.description}
        </Text>
      </Stack>
      {value !== undefined && (
        <Button
          icon={CloseIcon}
          mode="bleed"
          onClick={() => onChange(field.key, undefined)}
          padding={2}
          title={`Reset ${field.title}`}
        />
      )}
      <input
        aria-label={`${field.title} color`}
        onChange={(event) => onChange(field.key, event.currentTarget.value)}
        style={swatchStyle}
        type="color"
        value={expandHex(value ?? field.defaultValue)}
      />
    </Flex>
  )
}
