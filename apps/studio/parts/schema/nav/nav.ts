export const navItem = {
  type: 'object',
  name: 'nav.item',
  title: 'Navigation item',
  fields: [
    {type: 'boolean', name: 'hidden', title: 'Hidden'},
    {type: 'boolean', name: 'collapsed', title: 'Collapsed'},
    {type: 'string', name: 'title', title: 'Title'},
    {type: 'string', name: 'menuTitle', title: 'Menu title'},
    {type: 'string', name: 'segment', title: 'Segment'},
    {type: 'reference', name: 'target', title: 'Target', to: [{type: 'article'}, {type: 'screen'}]},
    {
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [{type: 'nav.item'}],
    },
  ],
}

export const nav = {
  type: 'document',
  name: 'nav',
  title: 'Navigation',
  fields: [
    {type: 'string', name: 'id', title: 'ID'},
    {type: 'string', name: 'title', title: 'Title'},
    {
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [{type: 'nav.item'}],
    },
  ],
}
