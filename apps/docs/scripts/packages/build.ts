import fs from 'fs'
import path from 'path'

const ROOT_PATH = path.resolve(__dirname, '../../../..')
const PACKAGES_PATH = path.resolve(__dirname, '../../packages.js')

const packages = {
  color: require('../../../../packages/@sanity/color/package.json'),
  icons: require('../../../../packages/@sanity/icons/package.json'),
  logos: require('../../../../packages/@sanity/logos/package.json'),
  ui: require('../../../../packages/@sanity/ui/package.json'),
}

fs.writeFileSync(
  PACKAGES_PATH,
  `// THIS FILE IS AUTO-GENERATED\n\n// prettier-ignore\nexport const packages = ${JSON.stringify(
    packages
  )}\n`
)

// eslint-disable-next-line no-console
console.log('Wrote packages to', path.relative(ROOT_PATH, PACKAGES_PATH))