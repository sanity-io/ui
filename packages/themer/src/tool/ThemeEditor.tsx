import {COLOR_TINTS, ColorTintKey} from '@sanity/color'
import {ResetIcon} from '@sanity/icons/Reset'
import {TrashIcon} from '@sanity/icons/Trash'
import {Box, Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {useMemo} from 'react'
import {styled} from 'styled-components'

import {buildPalette} from '../theme/buildPalette'
import {BuildThemeOptions, resolveThemeOptions} from '../theme/options'
import {useThemer} from './context'
import {ThemeThumbnail} from './ThemeThumbnail'

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

const rampStyle: React.CSSProperties = {
  display: 'flex',
  // The gaps let the border color through, so a near-white tint still reads
  // as a swatch rather than a hole in the ramp
  gap: 1,
  background: 'var(--card-border-color)',
  height: 13,
  borderRadius: 2,
  overflow: 'hidden',
  boxShadow: 'inset 0 0 0 1px var(--card-border-color)',
}

/**
 * The flow for editing one of the user's own themes: its title, a live
 * preview, the accent/text/background pickers and the contrast slider. Every
 * change applies to the whole Studio right away.
 *
 * @internal
 */
export function ThemeEditor(props: {focusTitle: boolean; slug: string}) {
  const {focusTitle, slug} = props
  const {themes, send} = useThemer()
  const theme = themes.find((candidate) => candidate.slug === slug && candidate.source === 'custom')

  // The machine only enters the edit flow for a listed custom theme, and
  // leaves it as soon as the theme is removed or deleted
  if (!theme) return null

  return (
    <ThemeEditorForm
      focusTitle={focusTitle}
      onDone={() => send({type: 'flow.list'})}
      onOptionsChange={(options) => send({type: 'theme.update', slug, options})}
      onRemove={() => send({type: 'theme.remove', slug})}
      onTitleChange={(title) => send({type: 'theme.update', slug, title})}
      options={theme.options}
      title={theme.title}
    />
  )
}

// Split from `ThemeEditor` so that the derived values below can be hooks
// while the editor bails out early when the theme is gone
function ThemeEditorForm(props: {
  focusTitle: boolean
  onDone: () => void
  onOptionsChange: (options: BuildThemeOptions) => void
  onRemove: () => void
  onTitleChange: (title: string) => void
  options: BuildThemeOptions
  title: string
}) {
  const {focusTitle, onDone, onOptionsChange, onRemove, onTitleChange, options, title} = props
  const resolved = useMemo(() => resolveThemeOptions(options), [options])
  const palette = useMemo(() => buildPalette(options), [options])

  const patch = (changes: Partial<BuildThemeOptions>) => {
    onOptionsChange({...options, ...changes})
  }

  const patchBackground = (changes: {dark?: string; light?: string}) => {
    onOptionsChange({...options, background: {...options.background, ...changes}})
  }

  const clearField = (field: 'text' | 'contrast') => {
    const next = {...options}

    delete next[field]
    onOptionsChange(next)
  }

  const clearBackground = (key: 'dark' | 'light') => {
    const background = {...options.background}

    delete background[key]

    const next = {...options}

    if (background.dark === undefined && background.light === undefined) {
      delete next.background
    } else {
      next.background = background
    }

    onOptionsChange(next)
  }

  return (
    <>
      <Box flex={1} overflow="auto" padding={3}>
        <Stack gap={4}>
          <ThemeThumbnail options={options} />

          <Stack gap={2}>
            <Text size={1} weight="medium">
              Title
            </Text>
            <TextInput
              autoFocus={focusTitle}
              fontSize={1}
              onChange={(event) => onTitleChange(event.currentTarget.value)}
              onFocus={focusTitle ? (event) => event.currentTarget.select() : undefined}
              padding={2}
              placeholder="Untitled theme"
              value={title}
            />
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
                auto={options.text === undefined}
                onChange={(text) => patch({text})}
                onClear={() => clearField('text')}
                tints={palette.gray}
                title="Text"
                value={resolved.text}
              />
            </Stack>
          </Stack>

          <Stack gap={3}>
            <Text size={1} weight="medium">
              Backgrounds
            </Text>
            <Stack gap={4}>
              <ColorRow
                adjusted={palette.black}
                auto={options.background?.dark === undefined}
                label="Dark background"
                onChange={(dark) => patchBackground({dark})}
                onClear={() => clearBackground('dark')}
                title="Dark"
                value={resolved.background.dark}
              />
              <ColorRow
                adjusted={palette.white}
                auto={options.background?.light === undefined}
                label="Light background"
                onChange={(light) => patchBackground({light})}
                onClear={() => clearBackground('light')}
                title="Light"
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
                  {options.contrast === undefined ? ' · auto' : ''}
                </Text>
              </Stack>
              {options.contrast !== undefined && (
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
        </Stack>
      </Box>

      <Card borderTop padding={3}>
        <Flex gap={2}>
          <Button
            icon={TrashIcon}
            mode="ghost"
            onClick={onRemove}
            text="Remove"
            title="Remove the theme — it can be restored until it is deleted"
            tone="critical"
          />
          <Box flex={1} />
          <Button mode="ghost" onClick={onDone} text="Done" />
        </Flex>
      </Card>
    </>
  )
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
  /** The accessible name of the picker, when the title alone would be ambiguous */
  label?: string
  onChange: (value: string) => void
  onClear?: () => void
  /** The generated tint ramp this color anchors */
  tints?: Record<ColorTintKey, string>
  title: string
  value: string
}) {
  const {adjusted, auto, label, onChange, onClear, tints, title, value} = props

  return (
    <Stack gap={2}>
      <Flex align="center" gap={2}>
        <Swatch
          aria-label={label ?? `${title} color`}
          onChange={(event) => onChange(event.currentTarget.value)}
          type="color"
          value={value}
        />
        <Stack flex={1} gap={2} style={{minWidth: 0}}>
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
