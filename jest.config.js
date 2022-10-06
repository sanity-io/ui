/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const globby = require('globby')
const {workspaces} = require('./package.json')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  projects: globby
    .sync(workspaces.map((p) => path.join(__dirname, p, 'jest.config.js')))
    .map((p) => `<rootDir>/${path.relative(__dirname, path.dirname(p))}`),
}
