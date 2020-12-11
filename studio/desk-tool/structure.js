import S from '@sanity/desk-tool/structure-builder'
// import {RocketIcon} from '@sanity/icons'
// import React from 'react'

const STRUCTURE_CUSTOM_TYPES = ['features']
// const STRUCTURE_LIST_ITEM_DIVIDER = S.divider()

// The `Features` root list item
// const featuresListItem = S.listItem()
//   .title('Features')
//   // .icon(() => <RocketIcon data-sanity-icon />)
//   .child(S.editor().id('features').schemaType('features').documentId('features'))

// The default root list items (except custom ones)
const defaultListItems = S.documentTypeListItems().filter(
  (listItem) => !STRUCTURE_CUSTOM_TYPES.includes(listItem.getId())
)

export default () =>
  S.list()
    .title('Content')
    .items([
      // featuresListItem,
      // STRUCTURE_LIST_ITEM_DIVIDER,
      ...defaultListItems,
    ])
