import S from '@sanity/desk-tool/structure-builder'
import {CogIcon, EditIcon, PackageIcon} from '@sanity/icons'
import documentStore from 'part:@sanity/base/datastore/document'
import React from 'react'
import {map} from 'rxjs/operators'

const STRUCTURE_CUSTOM_TYPES = [
  'api.class',
  'api.function',
  'api.interface',
  'api.package',
  'api.release',
  'api.typeAlias',
  'api.variable',
  'machine',
  'settings',
]

// Types that are editable by the <release> list
const RELEASE_TYPES = [
  'api.class',
  'api.function',
  'api.interface',
  'api.release',
  'api.typeAlias',
  'api.variable',
]

const packagesListItem = S.listItem()
  .icon(PackageIcon)
  .title('Packages')
  .child(
    S.documentTypeList('api.package')
      .title('Packages')
      .child((packageId) =>
        documentStore
          .listenQuery(`*[_id == $id]{_id,scope,name,releases[]->{_id,version}}[0]`, {
            id: packageId,
          })
          .pipe(
            map((packageDoc) => {
              if (!packageDoc) return null

              return S.list()
                .title(
                  packageDoc.scope ? `${packageDoc.scope}/${packageDoc.name}` : packageDoc.name
                )
                .id(packageDoc._id)
                .items(
                  packageDoc.releases.map((release) =>
                    S.listItem()
                      .title(release.version)
                      .child(
                        S.documentList()
                          .canHandleIntent((name, params) => {
                            if (name === 'edit' && RELEASE_TYPES.includes(params.type)) {
                              return true
                            }

                            return false
                          })
                          .defaultOrdering([{field: 'name', direction: 'asc'}])
                          .id(release._id)
                          .title(release.version)
                          .filter(`_type != "api.package" && references($releaseId)`)
                          .params({releaseId: release._id})
                          .menuItems([
                            S.menuItem()
                              .icon(EditIcon)
                              .title('Edit release')
                              .intent({
                                type: 'edit',
                                params: {id: release._id, type: 'api.release'},
                              })
                              .showAsAction(),
                          ])
                      )
                  )
                )
            })
          )
      )
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
    .items([settingsListItem, S.divider(), packagesListItem, ...defaultListItems, S.divider()])
