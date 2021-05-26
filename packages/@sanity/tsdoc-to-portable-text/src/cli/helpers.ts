import fs from 'fs'
import util from 'util'
import yargs from 'yargs'

const YARGS_IGNORE_KEY = ['_', '$0']

export const readFile = util.promisify(fs.readFile)

export async function readJSONFile(filePath: string) {
  const buf = await readFile(filePath)

  return JSON.parse(buf.toString())
}

export async function getCLIContext() {
  const argv = await yargs.argv
  const args = argv._.slice(0)
  const cmd = args.shift()
  const flags = Object.entries(argv).reduce((acc: Record<string, unknown>, [key, value]) => {
    if (!YARGS_IGNORE_KEY.includes(key)) {
      acc[key] = value
    }

    return acc
  }, {})

  return {args, cmd, cwd: process.cwd(), flags}
}
