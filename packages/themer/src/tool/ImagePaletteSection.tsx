import {SparklesIcon} from '@sanity/icons/Sparkles'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'
import {useMemo, useState} from 'react'
import {styled} from 'styled-components'

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

/** The swatches on display: the vibrant family over the muted one */
const TILES: ImagePaletteKey[] = [
  'vibrant',
  'lightVibrant',
  'darkVibrant',
  'muted',
  'lightMuted',
  'darkMuted',
]

const TILE_SIZE = 24
const TILE_GAP = 4

/** The image spans both rows of tiles */
const IMAGE_SIZE = TILE_SIZE * 2 + TILE_GAP

/** The variant previews are the theme thumbnails at half size */
const VARIANT_SCALE = 0.5
const VARIANT_WIDTH = 144

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${TILE_SIZE}px);
  grid-auto-rows: ${TILE_SIZE}px;
  gap: ${TILE_GAP}px;

  &[data-with-image='true'] {
    grid-template-columns: ${IMAGE_SIZE}px repeat(3, ${TILE_SIZE}px);
  }
`

const ImageTile = styled.img`
  display: block;
  grid-row: span 2;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 3px;
  object-fit: cover;
  box-shadow: inset 0 0 0 1px var(--card-border-color);
`

const Tile = styled.span`
  display: block;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--card-border-color);

  &[data-empty='true'] {
    background: repeating-linear-gradient(
      -45deg,
      transparent 0 3px,
      var(--card-border-color) 3px 4px
    );
  }
`

/**
 * The variants scroll sideways and snap into place, bleeding into the card's
 * padding so the row runs from edge to edge
 */
const VariantRow = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 -12px;
  padding: 2px 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 12px;
  scrollbar-width: thin;
`

const VariantButton = styled.button`
  appearance: none;
  flex: none;
  display: block;
  box-sizing: border-box;
  width: ${VARIANT_WIDTH * VARIANT_SCALE}px;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: center;
  cursor: pointer;
  scroll-snap-align: start;

  &:focus {
    outline: none;
  }
`

/** Clips the scaled-down thumbnail to its visual size */
const VariantFrame = styled.span`
  display: block;
  box-sizing: border-box;
  width: ${VARIANT_WIDTH * VARIANT_SCALE}px;
  height: ${(VARIANT_WIDTH * VARIANT_SCALE * 9) / 16}px;
  padding: 2px;
  border-radius: 6px;
  overflow: hidden;
  transition: box-shadow 100ms;

  ${VariantButton}:hover & {
    box-shadow: 0 0 0 2px var(--card-border-color);
  }

  ${VariantButton}[aria-pressed='true'] & {
    box-shadow: 0 0 0 2px var(--card-focus-ring-color);
  }

  ${VariantButton}:focus-visible & {
    outline: 2px solid var(--card-focus-ring-color);
    outline-offset: 1px;
  }
`

const VariantScale = styled.span`
  display: block;
  width: ${VARIANT_WIDTH}px;
  transform: scale(${VARIANT_SCALE});
  transform-origin: top left;
`

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
  const current = palette ? currentImageVariant(options, palette) : null

  const variants = useMemo(() => {
    if (!palette) return []

    return IMAGE_PALETTE_VARIANTS.flatMap((variant) =>
      palette[variant] === null
        ? []
        : [{variant, options: applyImagePalette(options, palette, variant)}],
    )
  }, [options, palette])

  return (
    <Card
      border
      onDragLeave={() => setDragging(false)}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDrop={(event) => {
        event.preventDefault()
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
            <PaletteGrid data-with-image={imageUrl !== undefined}>
              {imageUrl && <ImageTile alt="" src={imageUrl} />}
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
                    <Tile data-empty={hex === null} style={{background: hex ?? undefined}} />
                  </Tooltip>
                )
              })}
            </PaletteGrid>

            <Stack gap={2}>
              <Text muted size={0}>
                Pick the swatch to build the theme around
              </Text>
              <VariantRow>
                {variants.map(({variant, options: variantOptions}) => (
                  <VariantButton
                    aria-pressed={variant === current}
                    key={variant}
                    onClick={() => onVariant(variant)}
                    type="button"
                  >
                    <VariantFrame>
                      <VariantScale>
                        <ThemeThumbnail options={variantOptions} />
                      </VariantScale>
                    </VariantFrame>
                    <Box paddingTop={1}>
                      <Text
                        align="center"
                        size={0}
                        textOverflow="ellipsis"
                        weight={variant === current ? 'medium' : 'regular'}
                      >
                        {IMAGE_PALETTE_TITLES[variant]}
                      </Text>
                    </Box>
                  </VariantButton>
                ))}
              </VariantRow>
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
