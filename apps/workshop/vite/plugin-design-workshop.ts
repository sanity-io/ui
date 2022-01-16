import fs from 'fs'
import path from 'path'
import {PluginOption} from 'vite'

const PACKAGES_PATH = path.resolve(__dirname, '../src/packages.js')

const packages = {
  color: require('../../../packages/@sanity/color/package.json'),
  icons: require('../../../packages/@sanity/icons/package.json'),
  logos: require('../../../packages/@sanity/logos/package.json'),
  ui: require('../../../packages/@sanity/ui/package.json'),
}

fs.writeFileSync(
  PACKAGES_PATH,
  `// THIS FILE IS AUTO-GENERATED\n\n// prettier-ignore\nexport const packages = ${JSON.stringify(
    packages
  )}\n`
)

export function designWorkshop(): PluginOption {
  return {
    name: 'design-workshop',
    resolveId(id) {
      if (id === '$packages') {
        return PACKAGES_PATH
      }

      return undefined
    },
  }
}
