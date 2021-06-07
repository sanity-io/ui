import fs from 'fs'
import util from 'util'

export const readFile = util.promisify(fs.readFile)
export const writeFile = util.promisify(fs.writeFile)

export async function readJSONFile(filePath: string): Promise<any> {
  const buf = await readFile(filePath)

  return JSON.parse(buf.toString())
}
