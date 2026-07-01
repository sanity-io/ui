import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: '@sanity/icons',
  projectId: 'ppsg7ml5',
  dataset: 'icons',
  plugins: [structureTool(), media()],
  schema: {
    types: schemaTypes,
  },

  // Disabling a bunch of stuff
  announcements: {enabled: false},
  apps: {canvas: {enabled: false}},
  beta: {create: {startInCreateEnabled: false}},
  document: {comments: {enabled: false}},
  mediaLibrary: {enabled: false},
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  scheduledPublishing: {enabled: false},
  tasks: {enabled: false},
})
