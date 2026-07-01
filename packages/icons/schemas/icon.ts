import {defineField, defineType} from 'sanity'

export const iconType = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'document',
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename',
      description: 'The SVG filename as it exists in the `export/` directory, e.g. "add-user.svg".',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'namedExport',
      title: 'Named export',
      description:
        'The ESM named export, e.g. "AddUserIcon" for `import {AddUserIcon} from \'@sanity/icons\'`.',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'image',
      title: 'Raster preview',
      description: 'PNG rasterization of the SVG, used as the vision source for enrichment.',
      type: 'image',
      readOnly: true,
    }),
    defineField({
      name: 'svgHash',
      title: 'SVG hash',
      description: 'sha1 of the source SVG. Used to skip work when an icon has not changed.',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'AI-generated search keywords/synonyms. Embedded for semantic search.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'AI-generated, search-friendly description. Embedded for semantic search.',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'filename', subtitle: 'namedExport', media: 'image'},
  },
})
