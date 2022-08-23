import path from 'path'
import mkdirp from 'mkdirp'
import {TransformResult} from '../transform'
import {writeFile} from './helpers'

/**
 * @public
 */
export async function load(
  transformed: TransformResult,
  opts: {fs?: {path: string}} = {}
): Promise<void> {
  if (opts.fs) {
    const dirPath = path.dirname(opts.fs.path)

    await mkdirp(dirPath)
    await writeFile(opts.fs.path, JSON.stringify(transformed, null, 2) + '\n')
  }

  // @todo: Write to Sanity
}
