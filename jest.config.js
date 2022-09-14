/* eslint-disable @typescript-eslint/no-var-requires */

const {workspaces} = require('./package.json')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  projects: workspaces.map((pattern) => `<rootDir>/${pattern}`),
}
