import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
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
          id: 'ppsg7ml5.icons',
        },
      },
    }),
  ],
})
