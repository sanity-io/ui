import S from '@sanity/desk-tool/structure-builder'
import {CogIcon, EditIcon, PackageIcon} from '@sanity/icons'
import {SanityDocument} from '@sanity/types'
import documentStore from 'part:@sanity/base/datastore/document'
import React from 'react'
import {map} from 'rxjs/operators'
import {isArray, isRecord, isString} from '../lib/helpers'
import {ArticlePreview} from './documentView/articlePreview'

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
            map((packageDoc: SanityDocument) => {
              if (!packageDoc) return null

              const scope = isString(packageDoc.scope) && packageDoc.scope
              const name = isString(packageDoc.name) && packageDoc.name
              const title = isString(scope) ? `${scope}/${name}` : `${name}`
              const releases = isArray(packageDoc.releases) ? packageDoc.releases : []

              return S.list()
                .title(title)
                .id(packageDoc._id)
                .items(
                  releases.map((release, releaseIndex) => {
                    const releaseId =
                      isRecord(release) && isString(release._id)
                        ? release._id
                        : `<release-#${releaseIndex}>`

                    const releaseTitle =
                      isRecord(release) && isString(release.version)
                        ? release.version
                        : '<missing version>'

                    const menuItems = [
                      S.menuItem()
                        .icon(EditIcon)
                        .title('Edit release')
                        .intent({
                          type: 'edit',
                          params: {id: releaseId, type: 'api.release'},
                        })
                        .showAsAction(true),
                    ]

                    return S.listItem()
                      .title(releaseTitle)
                      .child(
                        S.documentList()
                          .canHandleIntent((name, params) => {
                            if (name === 'edit' && RELEASE_TYPES.includes(params.type)) {
                              return true
                            }

                            return false
                          })
                          .defaultOrdering([{field: 'name', direction: 'asc'}])
                          .id(releaseId)
                          .title(releaseTitle)
                          .filter(`_type != "api.package" && references($releaseId)`)
                          .params({releaseId})
                          .menuItems(menuItems)
                      )
                  })
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
const defaultListItems = S.documentTypeListItems().filter((listItem) => {
  const id = listItem.getId()

  if (!id) return true

  return !STRUCTURE_CUSTOM_TYPES.includes(id)
})

export function getDefaultDocumentNode({schemaType}: {schemaType: string}) {
  // Add `Preview` tab to the `article` document form
  if (schemaType === 'article') {
    return S.document().views([S.view.form(), S.view.component(ArticlePreview).title('Preview')])
  }

  return undefined
}

export default () =>
  S.list()
    .title('Content')
    .items([settingsListItem, S.divider(), packagesListItem, ...defaultListItems])
