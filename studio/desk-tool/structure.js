import S from '@sanity/desk-tool/structure-builder'
import {CogIcon} from '@sanity/icons'
import React from 'react'

const STRUCTURE_CUSTOM_TYPES = ['machine', 'perf.testRun', 'settings']
// const STRUCTURE_LIST_ITEM_DIVIDER =

const perfListItem = S.listItem()
  // .id('performance')
  .title('Performance')
  .child(
    S.list()
      // .id('performance')
      .title('Performance')
      .items([
        S.listItem()
          .title('Performance test run')
          .child(S.documentTypeList('perf.testRun').title('Performance test run')),
        S.listItem().title('Machine').child(S.documentTypeList('machine').title('Machine')),
      ])
  )

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
    .items([settingsListItem, S.divider(), ...defaultListItems, S.divider(), perfListItem])
