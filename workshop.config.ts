import {buildTheme} from '@sanity/ui/theme'
import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'

import {cssPlugin} from './workshop/css'
import {fontsPlugin} from './workshop/fonts'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const theme = buildTheme()

export default defineConfig({
  plugins: [fontsPlugin(), cssPlugin({theme}), perfPlugin()],
  title: '@sanity/ui',
  theme,
})
