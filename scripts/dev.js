'use strict'

const moduleAlias = require('module-alias')
const path = require('path')

moduleAlias.addAlias('@sanity/ui', path.resolve(__dirname, '../src'))

const {dev} = require('@sanity/ui-workshop/runtime')

dev({cwd: path.resolve(__dirname, '..')}).catch((err) => {
  console.error(err)
  process.exit(1)
})
