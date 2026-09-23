import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {Menu, MenuButton, MenuDivider, MenuItem} from '@sanity/ui/menu'
import {type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useState} from 'react'
import {styled} from 'styled-components'

import {SCHEMES} from '../theme/options'
import {ImageFileButton} from './ImageFileButton'
import {IMAGE_PALETTE_KEYS, IMAGE_PALETTE_TITLES, ImagePalette} from './imagePalette'
import {useImagePalette} from './useImagePalette'

/** The colors of a scheme a swatch can be assigned to */
type SwatchTarget = 'accent' | 'text' | 'background'

const TARGETS: SwatchTarget[] = ['accent', 'text', 'background']

const Swatch = styled.span`
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--card-border-color);
`

/**
 * Takes the colors of a theme from an image, on device: the image is read
 * into a canvas and its palette extracted right there — nothing is uploaded.
 * Picking an image applies its palette to the theme, and the swatches stay
 * around so that any of them can be assigned to a color of either scheme.
 *
 * @internal
 */
export function ImagePaletteSection(props: {
  onAssign: (scheme: ThemeColorSchemeKey, target: SwatchTarget, hex: string) => void
  onPalette: (palette: ImagePalette) => void
  palette?: ImagePalette
}) {
  const {onAssign, onPalette, palette} = props
  const {busy, pickImage} = useImagePalette(onPalette)
  const [dragging, setDragging] = useState(false)

  const swatches = palette
    ? IMAGE_PALETTE_KEYS.flatMap((key) => {
        const hex = palette[key]

        return hex ? [{key, hex, title: IMAGE_PALETTE_TITLES[key]}] : []
      })
    : []

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
              title="Pick another image"
            />
          )}
        </Flex>

        {swatches.length > 0 ? (
          <Flex gap={1} wrap="wrap">
            {swatches.map(({key, hex, title}) => (
              <MenuButton
                button={
                  <Button
                    aria-label={`${title} ${hex}`}
                    mode="bleed"
                    padding={1}
                    title={`${title} · ${hex}`}
                  >
                    <Swatch style={{background: hex}} />
                  </Button>
                }
                id={`themer-swatch-${key}`}
                key={key}
                menu={
                  <Menu>
                    {SCHEMES.map((scheme, index) => (
                      <SchemeTargets
                        hex={hex}
                        key={scheme}
                        onAssign={onAssign}
                        scheme={scheme}
                        withDivider={index > 0}
                      />
                    ))}
                  </Menu>
                }
                popover={{placement: 'bottom-start', portal: true}}
              />
            ))}
          </Flex>
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
              width="fill"
            />
          </Stack>
        )}
      </Stack>
    </Card>
  )
}

function SchemeTargets(props: {
  hex: string
  onAssign: (scheme: ThemeColorSchemeKey, target: SwatchTarget, hex: string) => void
  scheme: ThemeColorSchemeKey
  withDivider: boolean
}) {
  const {hex, onAssign, scheme, withDivider} = props

  return (
    <>
      {withDivider && <MenuDivider />}
      {TARGETS.map((target) => (
        <MenuItem
          key={target}
          onClick={() => onAssign(scheme, target, hex)}
          text={`Use as ${scheme} ${target}`}
        />
      ))}
    </>
  )
}
