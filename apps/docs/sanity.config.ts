import {codeInput} from '@sanity/code-input'
import {gray} from '@sanity/color'
import {SanityMonogram} from '@sanity/logos'
import {createElement} from 'react'
import {defineConfig, type WorkspaceOptions} from 'sanity'
import {deskTool} from 'sanity/desk'
import {presentationTool} from 'sanity/presentation'

import {schema} from '@/studio/schema'
import {structure} from '@/studio/structure'

const DevSanityMonogram = () =>
  createElement(SanityMonogram, {color: {bg1: gray[200].hex, bg2: gray[100].hex, fg: gray[50].hex}})

const prodStudio = defineConfig<WorkspaceOptions>({
  basePath: '/production',
  name: 'production',
  title: 'Sanity UI',
  projectId: 'mos42crl',
  dataset: 'production',
  plugins: [
    codeInput(),
    deskTool({structure}),
    presentationTool({
      previewUrl: {
        preview: '/ui',
        draftMode: {
          enable: '/ui/api/draft',
          disable: '/ui/api/disable-draft',
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
    deskTool({structure}),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/ui/api/draft?dataset=development',
          disable: '/ui/api/disable-draft',
        },
      },
    }),
  ],
  schema,
  icon: DevSanityMonogram,
})

export default defineConfig<WorkspaceOptions[]>([prodStudio, devStudio])
