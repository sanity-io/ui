import fs from 'fs'
import path from 'path'

const ROOT_PATH = path.resolve(__dirname, '../..')
const CONFIG_TS_PATH = path.resolve(ROOT_PATH, 'sanity.config.ts')
const CONFIG_JSON_PATH = path.resolve(ROOT_PATH, 'sanity.json')

export function writeConfig() {
  fs.writeFileSync(
    CONFIG_JSON_PATH,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    JSON.stringify(require(CONFIG_TS_PATH).default, null, 2) + '\n'
  )

  // eslint-disable-next-line no-console
  console.log(`Generated: ${path.relative(ROOT_PATH, CONFIG_JSON_PATH)}`)
}
