import fs from 'fs'
import util from 'util'

export const writeFile = util.promisify(fs.writeFile)
