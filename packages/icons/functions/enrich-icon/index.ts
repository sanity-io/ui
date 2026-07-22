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

  // Shared context so the model understands these are interface glyphs, not
  // illustrations: they are used on software surfaces like Sanity Studio, Sanity
  // UI, the Portable Text Editor, and Sanity plugins.
  const preamble =
    `This is a monochrome line icon (an interface glyph) named "${label}" from the ` +
    'Sanity icon set. These icons appear on software surfaces such as Sanity Studio, ' +
    'Sanity UI, the Portable Text Editor, and Sanity plugins.'

  // 1. Use Sanity's native vision model (Agent Actions) to look at the
  //    rasterized icon and write a search-friendly description.
  await client.agent.action.transform({
    schemaId: '_.schemas.default',
    documentId: _id,
    // Write to the published document (not a draft) so dataset embeddings index it.
    forcePublishedWrite: true,
    instruction: [
      preamble,
      'In one or two sentences, describe what the glyph depicts and the action or',
      'concept it represents in such an interface.',
      'Do not list keywords or synonyms, and do not mention colors or that it is an SVG.',
    ].join(' '),
    target: [
      {
        path: ['description'],
        operation: {type: 'image-description', sourcePath: ['image']},
      },
    ],
  })

  // 2. Derive concise search tags (keywords live here, not in the description).
  await client.agent.action.generate({
    schemaId: '_.schemas.default',
    documentId: _id,
    forcePublishedWrite: true,
    instruction: [
      preamble,
      'Using the description in $description, generate a concise set of lowercase',
      'search tags: the objects, actions, concepts, UI features and common synonyms',
      'someone building or using a Sanity Studio, Portable Text Editor, or Sanity',
      'plugin might search to find this icon. Prefer single words or short phrases.',
    ].join(' '),
    instructionParams: {
      description: {type: 'field', path: ['description']},
    },
    target: [{path: ['tags']}],
  })

  console.log(`Enriched ${_id}`)
})
