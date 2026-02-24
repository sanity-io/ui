import {defineConfig} from '@sanity/ui-workshop'
import {a11yPlugin} from '@sanity/ui-workshop/plugin-a11y'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'
import {registerLanguage} from 'react-refractor'
import javascript from 'refractor/javascript'
import json from 'refractor/json'
import jsx from 'refractor/jsx'
import typescript from 'refractor/typescript'
import xml from 'refractor/xml-doc'

import pkg from './package.json'

xml.aliases = ['html']

registerLanguage(javascript)
registerLanguage(json)
registerLanguage(jsx)
registerLanguage(xml)
registerLanguage(typescript)

export default defineConfig({
  plugins: [a11yPlugin(), perfPlugin()],
  title: pkg.name,
})
