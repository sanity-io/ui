import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

import {article} from './article'
import {nav, navItem} from './nav'
import {screen, screenSections} from './screen'

export default createSchema({
  name: 'sanity-design-studio',
  types: schemaTypes.concat([article, nav, navItem, ...screenSections, screen]),
})
