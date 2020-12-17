import S from '@sanity/desk-tool/structure-builder'
import {CogIcon} from '@sanity/icons'
import React from 'react'

const STRUCTURE_CUSTOM_TYPES = ['settings']
const STRUCTURE_LIST_ITEM_DIVIDER = S.divider()

// The `Settings` root list item
const settingsListItem = S.listItem()
  .title('Settings')
  .icon(() => <CogIcon data-sanity-icon />)
  .child(S.editor().id('settings').schemaType('settings').documentId('settings'))

// The default root list items (except custom ones)
const defaultListItems = S.documentTypeListItems().filter(
  (listItem) => !STRUCTURE_CUSTOM_TYPES.includes(listItem.getId())
)

export default () =>
  S.list()
    .title('Content')
    .items([settingsListItem, STRUCTURE_LIST_ITEM_DIVIDER, ...defaultListItems])
