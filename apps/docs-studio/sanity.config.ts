import {codeInput} from '@sanity/code-input'
import {gray} from '@sanity/color'
import {SanityMonogram} from '@sanity/logos'
import {createElement} from 'react'
import {defineConfig, type WorkspaceOptions} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {schema} from '@/schema'
import {structure} from '@/structure'

const previewBaseUrl = process.env['SANITY_STUDIO_PREVIEW_BASE_URL'] ?? 'https://www.sanity.io/ui'

const prodStudio = defineConfig<WorkspaceOptions>({
  basePath: '/production',
  name: 'production',
  title: 'Sanity UI',
  projectId: process.env['SANITY_STUDIO_PROJECT_ID']!,
  dataset: process.env['SANITY_STUDIO_DATASET_PRODUCTION'] ?? 'production',
  plugins: [
    codeInput(),
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        preview: `${previewBaseUrl}`,
        draftMode: {
          enable: `${previewBaseUrl}/api/draft-mode/enable`,
          disable: `${previewBaseUrl}/api/draft-mode/disable`,
        },
      },
    }),
  ],
  schema,
  icon: SanityMonogram,
})

const devStudio = defineConfig<WorkspaceOptions>({
  basePath: '/development',
  name: 'development',
  title: 'Sanity UI (dev)',
  projectId: process.env['SANITY_STUDIO_PROJECT_ID']!,
  dataset: process.env['SANITY_STUDIO_DATASET_DEVELOPMENT'] ?? 'development',
  plugins: [
    codeInput(),
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        preview: `${previewBaseUrl}`,
        draftMode: {
          enable: `${previewBaseUrl}/api/draft-mode/enable?env=development`,
          disable: `${previewBaseUrl}/api/draft-mode/disable`,
        },
      },
    }),
  ],
  schema,
  icon: function SanityDevMonogram() {
    return createElement(SanityMonogram, {
      color: {bg1: gray[200].hex, bg2: gray[100].hex, fg: gray[50].hex},
    })
  },
})

export default defineConfig<WorkspaceOptions[]>([prodStudio, devStudio])
