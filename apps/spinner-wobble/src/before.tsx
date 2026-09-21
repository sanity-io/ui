import {Box, Card, Flex, Grid, Spinner, Text, ThemeProvider} from '@sanity/ui-wobbly'
import {Autocomplete} from '@sanity/ui-wobbly/autocomplete'
import {buildTheme} from '@sanity/ui-wobbly/theme'

import '@sanity/ui-wobbly/styles.css'

import {Scene, type UiKit} from './scene'

const ui: UiKit = {Autocomplete, Box, Card, Flex, Grid, Spinner, Text, ThemeProvider, buildTheme}

export default function Before() {
  return <Scene title="Before · @sanity/ui 4.2.0" ui={ui} />
}
