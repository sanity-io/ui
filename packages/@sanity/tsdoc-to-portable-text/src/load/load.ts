import path from 'path'
import mkdirp from 'mkdirp'
import {SanityDocumentValue} from '../sanity'
import {writeFile} from './helpers'

/**
 * @public
 */
export async function load(
  _docs: SanityDocumentValue[],
  opts: {fs?: {path: string}} = {}
): Promise<void> {
  if (opts.fs) {
    const dirPath = path.dirname(opts.fs.path)

    await mkdirp(dirPath)
    await writeFile(opts.fs.path, JSON.stringify(_docs, null, 2) + '\n')
  }

  // @todo: Write to Sanity
}
