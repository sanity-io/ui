import {SchemaPluginOptions} from 'sanity'

import {articleType} from './article/article'
import {navItemType, navType} from './nav'
import {screenType} from './screen'
import {seoType} from './seo'
import {settingsType} from './settings'

export const schema: SchemaPluginOptions = {
  types: [
    // objects
    navItemType,
    seoType,

    // documents
    articleType,
    navType,
    screenType,
    settingsType,
  ],
}
