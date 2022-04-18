/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs'
import path from 'path'

const ROOT_PATH = path.resolve(__dirname, '../../../..')
const PACKAGES_PATH = path.resolve(__dirname, '../../packages.js')

const packages = {
  color: _transformPackage(require('../../../../packages/@sanity/color/package.json')),
  icons: _transformPackage(require('../../../../packages/@sanity/icons/package.json')),
  logos: _transformPackage(require('../../../../packages/@sanity/logos/package.json')),
  ui: _transformPackage(require('../../../../packages/@sanity/ui/package.json')),
}

fs.writeFileSync(
  PACKAGES_PATH,
  `// THIS FILE IS AUTO-GENERATED\n\n// prettier-ignore\nexport const packages = ${JSON.stringify(
    packages,
    null,
    2
  )}\n`
)

// eslint-disable-next-line no-console
console.log('Wrote packages to', path.relative(ROOT_PATH, PACKAGES_PATH))

function _transformPackage(pkg: any) {
  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  }
}
