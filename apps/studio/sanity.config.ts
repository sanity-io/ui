import {codeInput} from '@sanity/code-input'
import {SanityMonogram} from '@sanity/logos'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './src/schema'
import {structure} from './src/structure'

// The docs site (apps/docs) is fully static and reads nothing from this
// project, so there is no presentation tool / preview setup. The schemas and
// content are preserved in case the docs ever move back to a data-driven
// approach.
export default defineConfig({
  name: 'production',
  title: 'Sanity UI',
  projectId: 'mos42crl',
  dataset: 'production',
  plugins: [codeInput(), structureTool({structure}), visionTool()],
  schema,
  icon: SanityMonogram,
})
