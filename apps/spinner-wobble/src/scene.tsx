import {SearchIcon} from '@sanity/icons/Search'
import type {Box, Card, Flex, Grid, Inline, Spinner, Text, ThemeProvider} from '@sanity/ui-fixed'
import type {Autocomplete} from '@sanity/ui-fixed/autocomplete'
import type {RootTheme} from '@sanity/ui-fixed/theme'
import {useEffect} from 'react'

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

const VARIANT_KEYS: Record<string, string> = {a: 'after', b: 'before'}

const TILE_TONES = {dark: 'default', light: 'transparent'} as const

const LOADING_STYLE = {transform: 'scale(calc(100vw / 640px))'}

const SEARCH_STYLE = {paddingInline: 'calc(100vw / 6)', transform: 'scale(calc(100vw / 640px))'}

function useVariantHotkeys(): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const variant = VARIANT_KEYS[event.key]

      if (variant) {
        window.location.search = `?variant=${variant}`
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}

function LoadingTile({scheme, ui}: TileProps) {
  const {Card, Flex, Inline, Spinner, Text} = ui

  return (
    <Card height="fill" scheme={scheme} tone={TILE_TONES[scheme]}>
      <Flex align="center" height="fill" justify="center">
        <Inline gap={3} style={LOADING_STYLE}>
          <Spinner size={3} />
          <Text size={3}>Loading&hellip;</Text>
        </Inline>
      </Flex>
    </Card>
  )
}

function SearchTile({scheme, ui}: TileProps) {
  const {Autocomplete, Box, Card, Flex} = ui

  return (
    <Card height="fill" scheme={scheme} tone={TILE_TONES[scheme]}>
      <Flex align="center" height="fill" padding={4} sizing="border" style={SEARCH_STYLE}>
        <Box className={styles.search} flex={1}>
          <Autocomplete
            fontSize={4}
            icon={SearchIcon}
            id={`search-${scheme}`}
            loading
            radius={6}
            value="Searching&hellip;"
          />
        </Box>
      </Flex>
    </Card>
  )
}

export function Scene({ui}: {ui: UiKit}) {
  const {Grid, ThemeProvider, theme} = ui

  useVariantHotkeys()

  return (
    <ThemeProvider theme={theme}>
      <Grid gridTemplateColumns={2} gridTemplateRows={2} height="fill">
        <LoadingTile scheme="dark" ui={ui} />
        <SearchTile scheme="light" ui={ui} />
        <LoadingTile scheme="light" ui={ui} />
        <SearchTile scheme="dark" ui={ui} />
      </Grid>
    </ThemeProvider>
  )
}
