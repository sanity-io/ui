import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

import {article} from './article'
import {machine} from './machine'
import {nav, navItem} from './nav'
import {screen, screenSections} from './screen'
import {seo} from './seo'
import {settings} from './settings'

export default createSchema({
  name: 'sanity-design-studio',
  types: schemaTypes.concat([
    article,
    machine,
    nav,
    navItem,
    ...screenSections,
    screen,
    seo,
    settings,
  ]),
})
