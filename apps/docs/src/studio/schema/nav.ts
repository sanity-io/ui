import {defineField, defineType} from 'sanity'

export const navItemType = defineType({
  type: 'object',
  name: 'nav.item',
  title: 'Navigation item',
  fields: [
    defineField({
      type: 'boolean',
      name: 'hidden',
      title: 'Hidden',
    }),
    defineField({
      type: 'boolean',
      name: 'collapsed',
      title: 'Collapsed',
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'string',
      name: 'menuTitle',
      title: 'Menu title',
    }),
    defineField({
      type: 'string',
      name: 'segment',
      title: 'Segment',
    }),
    defineField({
      type: 'reference',
      name: 'target',
      title: 'Target',
      to: [{type: 'article'}, {type: 'screen'}],
    }),
    defineField({
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [{type: 'nav.item'}],
    }),
  ],
})

export const navType = defineType({
  type: 'document',
  name: 'nav',
  title: 'Navigation',
  fields: [
    defineField({
      type: 'string',
      name: 'id',
      title: 'ID',
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [{type: 'nav.item'}],
    }),
  ],
})
