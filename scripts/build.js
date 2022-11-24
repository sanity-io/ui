/* eslint-disable @typescript-eslint/no-var-requires, import/order, no-console */

'use strict'

const moduleAlias = require('module-alias')
const path = require('path')

moduleAlias.addAlias('@sanity/ui', path.resolve(__dirname, '../src'))

const {build} = require('@sanity/ui-workshop/runtime')

build({cwd: path.resolve(__dirname, '..')}).catch((err) => {
  console.error(err)
  process.exit(1)
})
