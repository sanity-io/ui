import {devCommand} from '../src/cli/devCommand'

devCommand({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
