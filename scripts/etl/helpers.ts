import fs from 'fs'
import util from 'util'

export const readFile = util.promisify(fs.readFile)
export const writeFile = util.promisify(fs.writeFile)

export async function readJSONFile(filePath: string): Promise<unknown> {
  const buf = await readFile(filePath)

  return JSON.parse(buf.toString())
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
