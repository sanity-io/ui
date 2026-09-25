import {ResetIcon} from '@sanity/icons/Reset'
import {TrashIcon} from '@sanity/icons/Trash'
import {Badge, Box, Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useMemo} from 'react'
import {useColorSchemeValue} from 'sanity'

import {buildPalette, GeneratedColorPalette} from '../theme/buildPalette'
import {
  BuildThemeOptions,
  ResolvedSchemeOptions,
  resolveThemeOptions,
  SCHEMES,
  SchemeThemeOptions,
} from '../theme/options'
import {useThemer} from './context'
import {
  applyImagePalette,
  currentImageVariant,
  ImagePalette,
  ImagePaletteVariant,
  pickLuckyVariant,
} from './imagePalette'
import {ImagePaletteSection} from './ImagePaletteSection'
import {ScrollArea, ScrollAreaBleed} from './ScrollArea'
import {ThemeThumbnail} from './ThemeThumbnail'
import {TooltipButton} from './TooltipButton'

import {colorRowText, range, swatch} from './ThemeEditor.css'

const SCHEME_TITLES: Record<ThemeColorSchemeKey, string> = {
  dark: 'Dark mode',
  light: 'Light mode',
}

/**
 * Where the split preview shows a scheme: the Studio's own scheme stays next
 * to the sidebar (or at the bottom, stacked on small screens), the other one
 * takes the far side
 */
function splitHint(own: boolean, mobile: boolean): string {
  if (mobile) return own ? 'Shown at the bottom' : 'Shown at the top'

  return own ? 'Shown on the right, next to the themer' : 'Shown on the left'
}

const SCHEME_OPTION_KEYS: Array<keyof SchemeThemeOptions> = [
  'accent',
  'text',
  'background',
  'contrast',
]

/**
 * `<input type="color">` paints the color into a shadow-DOM swatch that brings
 * its own border and padding, which then sits inside ours as a second border.
 * Stripping that chrome leaves the themed border as the only one.
 */
/**
 * The flow for editing one of the user's own themes: its title, a live
 * preview, and a card per color scheme with the accent/text/background
 * pickers and the contrast slider of that scheme. Every change applies to the
 * whole Studio right away — in the scheme the Studio is showing, or in both
 * side by side in the split preview.
 *
 * @internal
 */
export function ThemeEditor(props: {focusTitle: boolean; slug: string}) {
  const {focusTitle, slug} = props
  const {themes, images, split, mobile, send} = useThemer()
  const theme = themes.find((candidate) => candidate.slug === slug && candidate.source === 'custom')

  // The machine only enters the edit flow for a listed custom theme, and
  // leaves it as soon as the theme is removed or deleted
  if (!theme) return null

  const applyVariant = (variant: ImagePaletteVariant | null) => {
    if (!theme.palette || variant === null) return

    send({
      type: 'theme.update',
      slug,
      options: applyImagePalette(theme.options, theme.palette, variant),
    })
  }

  return (
    <ThemeEditorForm
      focusTitle={focusTitle}
      imageUrl={images[slug]}
      onDone={() => send({type: 'flow.list'})}
      onLucky={() => {
        if (!theme.palette) return

        applyVariant(
          pickLuckyVariant(theme.palette, {
            exclude: currentImageVariant(theme.options, theme.palette),
          }),
        )
      }}
      onOptionsChange={(options) => send({type: 'theme.update', slug, options})}
      onPalette={(palette, file) =>
        send({
          type: 'theme.update',
          slug,
          options: applyImagePalette(theme.options, palette),
          palette,
          imageUrl: URL.createObjectURL(file),
        })
      }
      onRemove={() => send({type: 'theme.remove', slug})}
      onTitleChange={(title) => send({type: 'theme.update', slug, title})}
      onVariant={applyVariant}
      options={theme.options}
      palette={theme.palette}
      split={split}
      mobile={mobile}
      title={theme.title}
    />
  )
}

// Split from `ThemeEditor` so that the derived values below can be hooks
// while the editor bails out early when the theme is gone
function ThemeEditorForm(props: {
  focusTitle: boolean
  imageUrl?: string
  onDone: () => void
  onLucky: () => void
  onOptionsChange: (options: BuildThemeOptions) => void
  onPalette: (palette: ImagePalette, file: File) => void
  onRemove: () => void
  onTitleChange: (title: string) => void
  onVariant: (variant: ImagePaletteVariant) => void
  options: BuildThemeOptions
  palette?: ImagePalette
  /** Whether the Studio shows in light and dark side by side */
  split: boolean
  /** Whether the split preview stacks, on a small screen */
  mobile: boolean
  title: string
}) {
  const {
    focusTitle,
    imageUrl,
    onDone,
    onLucky,
    onOptionsChange,
    onPalette,
    onRemove,
    onTitleChange,
    onVariant,
    options,
    palette,
    split,
    mobile,
    title,
  } = props
  // The scheme the Studio is showing, with the appearance setting resolved
  const studioScheme = useColorSchemeValue()
  const resolved = useMemo(() => resolveThemeOptions(options), [options])
  const palettes = useMemo(() => buildPalette(options), [options])

  const patchScheme = (scheme: ThemeColorSchemeKey, changes: Partial<SchemeThemeOptions>) => {
    const values: SchemeThemeOptions = {...options[scheme], ...changes}

    // Clearing an option means falling back to its default, which is its absence
    for (const key of SCHEME_OPTION_KEYS) {
      if (values[key] === undefined) delete values[key]
    }

    const next: BuildThemeOptions = {...options}

    if (Object.keys(values).length === 0) {
      delete next[scheme]
    } else {
      next[scheme] = values
    }

    onOptionsChange(next)
  }

  return (
    <>
      <ScrollArea padding={3}>
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

          <ImagePaletteSection
            imageUrl={imageUrl}
            onLucky={onLucky}
            onPalette={onPalette}
            onVariant={onVariant}
            options={options}
            palette={palette}
          />

          <ScrollAreaBleed>
            {SCHEMES.map((scheme) => (
              <SchemeCard
                active={split || scheme === studioScheme}
                key={scheme}
                onChange={(changes) => patchScheme(scheme, changes)}
                options={options[scheme] ?? {}}
                palette={palettes[scheme]}
                resolved={resolved[scheme]}
                scheme={scheme}
                split={split}
                splitHint={splitHint(scheme === studioScheme, mobile)}
              />
            ))}
          </ScrollAreaBleed>
        </Stack>
      </ScrollArea>

      <Card borderTop padding={3}>
        <Flex gap={2}>
          <TooltipButton
            icon={TrashIcon}
            mode="ghost"
            onClick={onRemove}
            text="Remove"
            tone="critical"
            tooltip="Remove the theme — it can be restored until it is deleted"
          />
          <Box flex={1} />
          <Button mode="ghost" onClick={onDone} padding={2} text="Done" />
        </Flex>
      </Card>
    </>
  )
}

/**
 * The colors of one scheme. The cards span the sidebar edge to edge, one
 * after the other with a border between them, in the sidebar's own scheme —
 * the swatches show the colors they edit. The scheme the Studio is showing is
 * marked as active: its changes show up in the Studio right away, the other
 * scheme's only once the appearance setting switches to it — or both are
 * active, in the split preview.
 */
function SchemeCard(props: {
  active: boolean
  onChange: (changes: Partial<SchemeThemeOptions>) => void
  options: SchemeThemeOptions
  palette: GeneratedColorPalette
  resolved: ResolvedSchemeOptions
  scheme: ThemeColorSchemeKey
  split: boolean
  /** Where the split preview shows this scheme */
  splitHint: string
}) {
  const {active, onChange, options, palette, resolved, scheme, split, splitHint} = props
  const name = SCHEME_TITLES[scheme]

  return (
    <Card borderTop padding={3}>
      <Stack gap={4}>
        <Stack gap={2}>
          <Flex align="center" gap={2}>
            <Box flex={1}>
              <Text size={1} weight="medium">
                {name}
              </Text>
            </Box>
            {active && (
              <Badge fontSize={0} tone="primary">
                Active
              </Badge>
            )}
          </Flex>
          <Text muted size={0}>
            {split
              ? splitHint
              : active
                ? 'Shown in the Studio right now'
                : `Shown once the Studio appearance is ${scheme}`}
          </Text>
        </Stack>

        <ColorRow
          auto={options.accent === undefined}
          autoLabel="default"
          label={`${name} accent`}
          onChange={(accent) => onChange({accent})}
          onClear={() => onChange({accent: undefined})}
          title="Accent"
          value={resolved.accent}
        />
        <ColorRow
          auto={options.text === undefined}
          label={`${name} text`}
          onChange={(text) => onChange({text})}
          onClear={() => onChange({text: undefined})}
          title="Text"
          value={resolved.text}
        />
        <ColorRow
          adjusted={scheme === 'dark' ? palette.black : palette.white}
          auto={options.background === undefined}
          label={`${name} background`}
          onChange={(background) => onChange({background})}
          onClear={() => onChange({background: undefined})}
          title="Background"
          value={resolved.background}
        />

        <Stack gap={3}>
          <Flex align="center" gap={2}>
            <Stack flex={1} gap={2}>
              <Text size={1}>Contrast</Text>
              <Text muted size={0}>
                {resolved.contrast}
                {options.contrast === undefined ? ' · auto' : ''}
              </Text>
            </Stack>
            {options.contrast !== undefined && (
              <TooltipButton
                icon={ResetIcon}
                mode="bleed"
                onClick={() => onChange({contrast: undefined})}
                padding={2}
                tooltip="Reset to auto"
              />
            )}
          </Flex>
          <input
            aria-label={`${name} contrast`}
            className={range}
            max={100}
            min={15}
            onChange={(event) => onChange({contrast: Number(event.currentTarget.value)})}
            step={1}
            type="range"
            value={resolved.contrast}
          />
          <Text muted size={0}>
            100 keeps text and borders neutral — lower values blend in the accent
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}

/** One color of a scheme: a swatch with its value and an optional reset button */
function ColorRow(props: {
  /** The color the generator actually applied, when it may differ from the input */
  adjusted?: string
  /** Whether the value is derived or a default rather than explicitly set */
  auto?: boolean
  /** What the value is when it is not set: derived (`auto`) or the stock one (`default`) */
  autoLabel?: 'auto' | 'default'
  /** The accessible name of the picker */
  label: string
  onChange: (value: string) => void
  onClear?: () => void
  title: string
  value: string
}) {
  const {adjusted, auto, autoLabel = 'auto', label, onChange, onClear, title, value} = props

  return (
    <Flex align="center" gap={2}>
      <input
        aria-label={label}
        className={swatch}
        onChange={(event) => onChange(event.currentTarget.value)}
        type="color"
        value={value}
      />
      <Stack className={colorRowText} flex={1} gap={2}>
        <Text size={1}>{title}</Text>
        <Text muted size={0} textOverflow="ellipsis">
          {value}
          {adjusted !== undefined && adjusted !== value ? ` → ${adjusted}` : ''}
          {auto ? ` · ${autoLabel}` : ''}
        </Text>
      </Stack>
      {onClear && !auto && (
        <TooltipButton
          icon={ResetIcon}
          mode="bleed"
          onClick={onClear}
          padding={2}
          tooltip={`Reset to ${autoLabel}`}
        />
      )}
    </Flex>
  )
}
