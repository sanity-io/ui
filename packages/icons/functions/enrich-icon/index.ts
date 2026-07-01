// oxlint-disable no-console

import {createClient} from '@sanity/client'
import {documentEventHandler} from '@sanity/functions'

interface IconEvent {
  _id: string
}

export const handler = documentEventHandler<IconEvent>(async ({context, event}) => {
  const {_id} = event.data

  const client = createClient({
    ...context.clientOptions,
    apiVersion: 'vX',
    useCdn: false,
  })

  const label = _id.replace(/^icon_/, '')

  // 1. Use Sanity's native vision model (Agent Actions) to look at the
  //    rasterized icon and write a search-friendly description.
  await client.agent.action.transform({
    schemaId: '_.schemas.default',
    documentId: _id,
    // Write to the published document (not a draft) so dataset embeddings index it.
    forcePublishedWrite: true,
    instruction: [
      `This is a minimal, monochrome line UI icon named "${label}".`,
      'Write a short, search-friendly description of what it depicts,',
      'then list the concepts, actions, objects and synonyms a person might',
      'type to find it (for example, a clock should mention "time").',
      'Do not mention colors, the word "icon", or that it is an SVG.',
    ].join(' '),
    target: [
      {
        path: ['description'],
        operation: {type: 'image-description', sourcePath: ['image']},
      },
    ],
  })

  // 2. Derive concise search tags from the description just written.
  await client.agent.action.generate({
    schemaId: '_.schemas.default',
    documentId: _id,
    forcePublishedWrite: true,
    instruction: [
      'Using the icon description in $description, generate a concise set of',
      'lowercase search tags: the objects, actions, concepts and common synonyms',
      'someone might search to find this UI icon. Prefer single words or short phrases.',
    ].join(' '),
    instructionParams: {
      description: {type: 'field', path: ['description']},
    },
    target: [{path: ['tags']}],
  })

  console.log(`Enriched ${_id}`)
})
