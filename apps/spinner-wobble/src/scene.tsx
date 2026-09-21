import type {Box, Card, Flex, Grid, Spinner, Text, ThemeProvider} from '@sanity/ui-fixed'
import type {Autocomplete} from '@sanity/ui-fixed/autocomplete'
import type {buildTheme, RootTheme, ThemeFontSize} from '@sanity/ui-fixed/theme'
import {useEffect, useMemo, useState} from 'react'

import styles from './scene.module.css'

// The two installed versions share an API, so the fixed copy provides the types
// and each variant passes in its own components.
export interface UiKit {
  Autocomplete: typeof Autocomplete
  Box: typeof Box
  Card: typeof Card
  Flex: typeof Flex
  Grid: typeof Grid
  Spinner: typeof Spinner
  Text: typeof Text
  ThemeProvider: typeof ThemeProvider
  buildTheme: typeof buildTheme
}

type Scheme = 'light' | 'dark'

interface TileProps {
  scheme: Scheme
  ui: UiKit
}

const STAGE_WIDTH = 640
const STAGE_HEIGHT = 360

const VARIANT_KEYS: Record<string, string> = {a: 'after', b: 'before'}

// Icon sizes stay odd on purpose: the Safari wobble is a 1px snap while an
// odd-length spinner rotates, and `round(1em, 2px)` in 4.2.1 lands on an even
// length. These are the default text sizes scaled up so that snap still reads
// once a 16:9 capture is shown at 620px.
const TEXT_SIZES: Partial<Record<number, ThemeFontSize>> = {
  1: {
    ascenderHeight: 11,
    descenderHeight: 11,
    fontSize: 27,
    iconSize: 45,
    letterSpacing: 0,
    lineHeight: 41,
  },
  2: {
    ascenderHeight: 13,
    descenderHeight: 13,
    fontSize: 33,
    iconSize: 55,
    letterSpacing: 0,
    lineHeight: 51,
  },
}

function createTheme(buildTheme: UiKit['buildTheme']): RootTheme {
  const font = buildTheme().v2?.font

  if (!font) {
    throw new Error('Expected a v2 @sanity/ui theme')
  }

  const sizes = font.text.sizes.map((size, index) => TEXT_SIZES[index] ?? size)

  return buildTheme({font: {...font, text: {...font.text, sizes}}})
}

// Snap the scale to whole device pixels so the 1px grid lines stay crisp.
function fitScale(): number {
  const dpr = window.devicePixelRatio || 1
  const raw = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT)

  return Math.max(1 / dpr, Math.floor(raw * dpr) / dpr)
}

function useFitScale(): number {
  const [scale, setScale] = useState(fitScale)

  useEffect(() => {
    const update = () => setScale(fitScale())

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}

function useHotkeys(): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const variant = VARIANT_KEYS[event.key]

      if (variant) {
        window.location.search = `?variant=${variant}`
      } else if (event.key === 'f') {
        void (document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}

function LoadingTile({scheme, ui}: TileProps) {
  const {Card, Flex, Spinner, Text} = ui

  return (
    <Card className={styles.blueprint} height="fill" scheme={scheme} tone="transparent">
      <Flex align="center" gap={4} height="fill" justify="center">
        <Spinner size={2} />
        <Text size={2}>Loading&hellip;</Text>
      </Flex>
    </Card>
  )
}

function SearchTile({scheme, ui}: TileProps) {
  const {Autocomplete, Box, Card, Flex, Spinner} = ui

  return (
    <Card height="fill" scheme={scheme} tone="transparent">
      <Flex align="center" height="fill" padding={4}>
        <Box className={styles.search} flex={1}>
          <Autocomplete
            fontSize={1}
            icon={<Spinner size={1} />}
            id={`search-${scheme}`}
            padding={4}
            radius={2}
            value="Searching&hellip;"
          />
        </Box>
      </Flex>
    </Card>
  )
}

export function Scene({title, ui}: {title: string; ui: UiKit}) {
  const {Card, Flex, Grid, ThemeProvider} = ui
  const theme = useMemo(() => createTheme(ui.buildTheme), [ui])
  const scale = useFitScale()

  useHotkeys()

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <ThemeProvider theme={theme}>
      <Card height="fill" scheme="dark">
        <Flex align="center" height="fill" justify="center">
          <Grid
            className={styles.stage}
            gridTemplateColumns={2}
            gridTemplateRows={2}
            style={{transform: `scale(${scale})`}}
          >
            <LoadingTile scheme="dark" ui={ui} />
            <SearchTile scheme="light" ui={ui} />
            <LoadingTile scheme="light" ui={ui} />
            <SearchTile scheme="dark" ui={ui} />
          </Grid>
        </Flex>
      </Card>
    </ThemeProvider>
  )
}
