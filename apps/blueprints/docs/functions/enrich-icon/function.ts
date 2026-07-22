import {defineDocumentFunction} from '@sanity/blueprints'

// The dataset operated by https://www.sanity.io/ui, where
// packages/icons/scripts/seed-icons-dataset.ts seeds the icon documents
export const enrichIconFunction = defineDocumentFunction({
  name: 'enrich-icon',
  src: 'functions/enrich-icon',
  // Runs only for icons that don't yet have a description: newly created
  // icons, and changed icons whose description was cleared by the seed.
  event: {
    on: ['create', 'update'],
    filter: "_type == 'icon' && !defined(description)",
    projection: '{_id}',
    resource: {
      type: 'dataset',
      id: 'mos42crl.production',
    },
  },
})
