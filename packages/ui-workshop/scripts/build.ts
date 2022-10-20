import {buildCommand} from '../src/cli/buildCommand'

buildCommand({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
