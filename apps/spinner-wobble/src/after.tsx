import {Box, Card, Flex, Grid, Inline, Spinner, Text, ThemeProvider} from '@sanity/ui-fixed'
import {Autocomplete} from '@sanity/ui-fixed/autocomplete'
import {buildTheme} from '@sanity/ui-fixed/theme'

import '@sanity/ui-fixed/styles.css'

import {Scene, type UiKit} from './scene'

const ui: UiKit = {
  Autocomplete,
  Box,
  Card,
  Flex,
  Grid,
  Inline,
  Spinner,
  Text,
  ThemeProvider,
  theme: buildTheme(),
}

export default function After() {
  return <Scene ui={ui} />
}
