import {codeInput} from '@sanity/code-input'
import {gray} from '@sanity/color'
import {SanityMonogram} from '@sanity/logos'
import {createElement} from 'react'
import {defineConfig, type WorkspaceOptions} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {schema} from '@/studio/schema'
import {structure} from '@/studio/structure'

const localStudioRuntime =
  typeof window !== 'undefined' && window.location.origin === 'http://localhost:3333'
const previewOrigin = localStudioRuntime ? 'http://localhost:3000' : ''

const prodStudio = defineConfig<WorkspaceOptions>({
  basePath: '/production',
  name: 'production',
  title: 'Sanity UI',
  projectId: 'mos42crl',
  dataset: 'production',
  plugins: [
    codeInput(),
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        preview: `${previewOrigin}/ui`,
        draftMode: {
          enable: `${previewOrigin}/ui/api/draft`,
          disable: `${previewOrigin}/ui/api/disable-draft`,
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
  projectId: 'mos42crl',
  dataset: 'development',
  plugins: [
    codeInput(),
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        preview: `${previewOrigin}/ui`,
        draftMode: {
          enable: `${previewOrigin}/ui/api/draft?dataset=development`,
          disable: `${previewOrigin}/ui/api/disable-draft`,
        },
      },
    }),
  ],
  schema,
  icon: () =>
    createElement(SanityMonogram, {
      color: {bg1: gray[200].hex, bg2: gray[100].hex, fg: gray[50].hex},
    }),
})

export default defineConfig<WorkspaceOptions[]>([prodStudio, devStudio])
