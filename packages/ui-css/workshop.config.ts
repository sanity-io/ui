import {type WorkshopConfigOptions} from '@sanity/ui-workshop'
import {registerLanguage} from 'react-refractor'
import javascript from 'refractor/javascript'
import json from 'refractor/json'
import jsx from 'refractor/jsx'
import typescript from 'refractor/typescript'

registerLanguage(javascript)
registerLanguage(json)
registerLanguage(jsx)
registerLanguage(typescript)

const config: WorkshopConfigOptions = {
  title: 'ui-css',
  collections: [
    {
      name: 'primitives',
      title: 'Primitives',
    },
  ],
}

export default config
