'use client'

import {codeInput} from '@sanity/code-input'
import {SanityMonogram} from '@sanity/logos'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {schema} from '@/studio/schema'
import {structure} from '@/studio/structure'

const localStudioRuntime =
  typeof window !== 'undefined' && window.location.origin === 'http://localhost:3333'
const previewOrigin = localStudioRuntime ? 'http://localhost:3000' : ''

const prodStudio = defineConfig({
  name: 'production',
  title: 'Sanity UI',
  projectId: 'mos42crl',
  dataset: 'production',
  plugins: [
    codeInput(),
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        initial: `${previewOrigin}/ui`,
        previewMode: {
          enable: `${previewOrigin}/ui/api/draft-mode/enable`,
        },
      },
    }),
    visionTool(),
  ],
  schema,
  icon: SanityMonogram,
})

export default prodStudio
