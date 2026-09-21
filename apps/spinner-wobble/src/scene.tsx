import type {Box, Card, Flex, Grid, Inline, Spinner, Text, ThemeProvider} from '@sanity/ui-fixed'
import type {Autocomplete} from '@sanity/ui-fixed/autocomplete'
import type {RootTheme} from '@sanity/ui-fixed/theme'
import {useEffect, useState} from 'react'

import styles from './scene.module.css'

// The two installed versions share an API, so the fixed copy provides the types
// and each variant passes in its own components.
export interface UiKit {
  Autocomplete: typeof Autocomplete
  Box: typeof Box
  Card: typeof Card
  Flex: typeof Flex
  Grid: typeof Grid
  Inline: typeof Inline
  Spinner: typeof Spinner
  Text: typeof Text
  ThemeProvider: typeof ThemeProvider
  theme: RootTheme
}

type Scheme = 'light' | 'dark'

interface TileProps {
  scheme: Scheme
  ui: UiKit
}

const STAGE_WIDTH = 640
const STAGE_HEIGHT = 360

const VARIANT_KEYS: Record<string, string> = {a: 'after', b: 'before'}

const TILE_TONES = {dark: 'default', light: 'transparent'} as const

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
  const {Card, Flex, Inline, Spinner, Text} = ui

  return (
    <Card className={styles.blueprint} height="fill" scheme={scheme} tone={TILE_TONES[scheme]}>
      <Flex align="center" height="fill" justify="center">
        <Inline gap={3}>
          <Spinner size={3} />
          <Text size={3}>Loading&hellip;</Text>
        </Inline>
      </Flex>
    </Card>
  )
}

// Same field as the icons.sanity.dev search: default size and padding, radius
// 2, and the spinner in the leading icon slot while results load.
function SearchTile({scheme, ui}: TileProps) {
  const {Autocomplete, Box, Card, Flex, Spinner} = ui

  return (
    <Card height="fill" scheme={scheme} tone={TILE_TONES[scheme]}>
      <Flex align="center" height="fill" padding={4} sizing="border">
        <Box className={styles.search} flex={1}>
          <Autocomplete
            icon={<Spinner />}
            id={`search-${scheme}`}
            radius={2}
            value="Searching&hellip;"
          />
        </Box>
      </Flex>
    </Card>
  )
}

export function Scene({title, ui}: {title: string; ui: UiKit}) {
  const {Card, Flex, Grid, ThemeProvider, theme} = ui
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
