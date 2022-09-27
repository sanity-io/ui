import {CogIcon} from '@sanity/icons'
import {StructureResolver} from 'sanity/desk'

const singletonTypes = new Set(['settings'])

export const structure: StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      // Our singleton type has a list item with a custom child
      S.listItem().title('Settings').id('settings').icon(CogIcon).child(
        // Instead of rendering a list of documents, we render a single
        // document, specifying the `documentId` manually to ensure
        // that we're editing the single instance of the document
        S.document().schemaType('settings').documentId('settings'),
      ),

      S.divider(),

      // Regular document types
      ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId()!)),
    ])
}
