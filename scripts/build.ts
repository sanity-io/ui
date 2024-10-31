import {buildCommand} from '../src/cli/buildCommand'

buildCommand({
  cwd: process.cwd(),
  outDir: process.cwd() + '/dist',
})
