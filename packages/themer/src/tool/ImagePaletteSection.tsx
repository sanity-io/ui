import {SparklesIcon} from '@sanity/icons/Sparkles'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'
import {assignInlineVars} from '@vanilla-extract/dynamic'
import {useEffect, useMemo, useRef, useState} from 'react'

import {BuildThemeOptions} from '../theme/options'
import {ImageFileButton} from './ImageFileButton'
import {
  applyImagePalette,
  currentImageVariant,
  IMAGE_PALETTE_TITLES,
  IMAGE_PALETTE_VARIANTS,
  ImagePalette,
  ImagePaletteKey,
  ImagePaletteVariant,
} from './imagePalette'
import {ThemeThumbnail} from './ThemeThumbnail'
import {TooltipButton} from './TooltipButton'
import {useImagePalette} from './useImagePalette'

import {
  imageTile,
  paletteGrid,
  ROW_PADDING,
  tile,
  VARIANT_FRAME,
  VARIANT_GAP,
  VARIANT_WIDTH,
  variantButton,
  variantFrame,
  variantRow,
  variantScale,
  variantScaleBox,
  variantWidth,
} from './ImagePaletteSection.css'

/** The swatches on display: the vibrant family over the muted one */
const TILES: ImagePaletteKey[] = [
  'vibrant',
  'lightVibrant',
  'darkVibrant',
  'muted',
  'lightMuted',
  'darkMuted',
]

/**
 * How many variants show at once: two and a half, so that the cut-off third
 * one gives away that the row scrolls
 */
const VISIBLE_VARIANTS = 2.5

/** The width of one variant, before the row has been measured */
const FALLBACK_VARIANT_WIDTH = 58

/**
 * Takes the colors of a theme from an image, on device: the image is read
 * into a canvas and its palette extracted right there — nothing is uploaded.
 * Shows the image (while the session lasts) next to its palette, offers a
 * theme variant built around each swatch as a small preview, and a lucky
 * button that picks an interesting one.
 *
 * @internal
 */
export function ImagePaletteSection(props: {
  imageUrl?: string
  onPalette: (palette: ImagePalette, file: File) => void
  onVariant: (variant: ImagePaletteVariant) => void
  onLucky: () => void
  options: BuildThemeOptions
  palette?: ImagePalette
}) {
  const {imageUrl, onPalette, onVariant, onLucky, options, palette} = props
  const {busy, pickImage} = useImagePalette(onPalette)
  const [dragging, setDragging] = useState(false)
  // `dragleave` also fires when the pointer crosses into a child, so the
  // highlight tracks how deep the drag is rather than the last event
  const dragDepth = useRef(0)
  const current = palette ? currentImageVariant(options, palette) : null
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [thumbnailWidth, setThumbnailWidth] = useState(FALLBACK_VARIANT_WIDTH)

  // Size the variants to the row, so two and a half of them are in view
  useEffect(() => {
    const row = rowRef.current

    if (!row) return undefined

    const measure = () => {
      const visible =
        row.clientWidth - ROW_PADDING - (Math.ceil(VISIBLE_VARIANTS) - 1) * VARIANT_GAP

      // Each variant is its thumbnail plus the frame on either side
      setThumbnailWidth(Math.max(24, Math.floor(visible / VISIBLE_VARIANTS) - VARIANT_FRAME * 2))
    }

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(row)

    return () => observer.disconnect()
  }, [palette])

  const variants = useMemo(() => {
    if (!palette) return []

    return IMAGE_PALETTE_VARIANTS.flatMap((variant) =>
      palette[variant] === null
        ? []
        : [
            {
              variant,
              title: IMAGE_PALETTE_TITLES[variant],
              options: applyImagePalette(options, palette, variant),
            },
          ],
    )
  }, [options, palette])

  return (
    <Card
      border
      onDragEnter={(event) => {
        event.preventDefault()
        dragDepth.current++
        setDragging(true)
      }}
      onDragLeave={() => {
        dragDepth.current = Math.max(0, dragDepth.current - 1)

        if (dragDepth.current === 0) setDragging(false)
      }}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={(event) => {
        event.preventDefault()
        dragDepth.current = 0
        setDragging(false)

        const file = event.dataTransfer.files[0]

        if (file) pickImage(file)
      }}
      padding={3}
      radius={3}
      tone={dragging ? 'primary' : 'default'}
    >
      <Stack gap={3}>
        <Flex align="center" gap={2}>
          <Box flex={1}>
            <Text size={1} weight="medium">
              Image palette
            </Text>
          </Box>
          {palette && (
            <ImageFileButton
              loading={busy}
              mode="bleed"
              onFile={pickImage}
              padding={2}
              tooltip="Pick another image"
            />
          )}
        </Flex>

        {palette ? (
          <>
            <div className={paletteGrid} data-with-image={imageUrl !== undefined}>
              {imageUrl && <img alt="" className={imageTile} src={imageUrl} />}
              {TILES.map((key) => {
                const hex = palette[key]
                const title = IMAGE_PALETTE_TITLES[key]

                return (
                  <Tooltip
                    animate
                    content={
                      <Text size={1}>
                        {hex ? `${title} · ${hex}` : `No ${title.toLowerCase()} color`}
                      </Text>
                    }
                    key={key}
                    placement="bottom"
                    portal
                  >
                    <span
                      className={tile}
                      data-empty={hex === null}
                      style={{background: hex ?? undefined}}
                    />
                  </Tooltip>
                )
              })}
            </div>

            <Stack gap={2}>
              <Text muted size={0}>
                Pick the swatch to build the theme around
              </Text>
              <div
                className={variantRow}
                ref={rowRef}
                style={assignInlineVars({
                  [variantWidth]: `${thumbnailWidth}px`,
                  [variantScale]: String(thumbnailWidth / VARIANT_WIDTH),
                })}
              >
                {variants.map(({variant, title, options: variantOptions}) => (
                  // oxlint-disable-next-line control-has-associated-label -- the title below the thumbnail is the label, deeper than the rule looks
                  <button
                    aria-pressed={variant === current}
                    className={variantButton}
                    key={variant}
                    onClick={() => onVariant(variant)}
                    type="button"
                  >
                    <span className={variantFrame}>
                      <span className={variantScaleBox}>
                        <ThemeThumbnail options={variantOptions} />
                      </span>
                    </span>
                    <Box as="span" display="block" paddingTop={1}>
                      <Text
                        align="center"
                        as="span"
                        size={0}
                        textOverflow="ellipsis"
                        weight={variant === current ? 'medium' : 'regular'}
                      >
                        {title}
                      </Text>
                    </Box>
                  </button>
                ))}
              </div>
            </Stack>

            <TooltipButton
              icon={SparklesIcon}
              mode="ghost"
              onClick={onLucky}
              text="I'm feeling lucky"
              tooltip="Build the theme around a swatch that looks interesting"
              width="fill"
            />
          </>
        ) : (
          <Stack gap={3}>
            <Text muted size={0}>
              Take the accent, text and background colors from an image — read on device, nothing is
              uploaded.
            </Text>
            <ImageFileButton
              loading={busy}
              mode="ghost"
              onFile={pickImage}
              text="Pick an image"
              tooltip="Take the colors from an image on your device"
              width="fill"
            />
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
