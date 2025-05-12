import crypto from 'crypto'

import pkg from './package.json'

function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex')
}

export const prefix = `s${md5(pkg.version).slice(0, 5)}`
