import {codeInput} from '@sanity/code-input'
import {SanityMonogram} from '@sanity/logos'
import {themerTool} from '@sanity/themer/tool'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'

import {schema} from './src/schema'
import {structure} from './src/structure'

// The docs site (apps/docs) is fully static and no longer reads from this
// project at runtime, so there is no presentation tool / preview setup. The
// schemas and content are preserved in case the docs ever move back to a
// data-driven approach.
export default defineConfig({
  name: 'production',
  title: 'Sanity UI',
  projectId: 'mos42crl',
  dataset: 'production',
  plugins: [
    codeInput(),
    structureTool({structure}),
    visionTool(),
    // Browse the uploaded image assets, e.g. the rasterized icon previews
    // that `packages/icons/scripts/seed-icons-dataset.ts` uploads.
    media(),
    themerTool(),
  ],
  schema,
  icon: SanityMonogram,
})
