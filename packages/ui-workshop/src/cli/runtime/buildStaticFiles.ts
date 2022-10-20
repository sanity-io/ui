import path from 'path'
import mkdirp from 'mkdirp'
import {_writeFrameHTML} from './_writeFrameHTML'
import {_writeFrameScript} from './_writeFrameScript'
import {_writeHTML} from './_writeHTML'
import {_writeScript} from './_writeScript'

export async function buildStaticFiles(options: {outDir: string}): Promise<void> {
  const {outDir} = options

  await mkdirp(outDir)
  await _writeHTML({outDir})
  await _writeScript({outDir})

  await mkdirp(path.resolve(outDir, 'frame'))
  await _writeFrameHTML({outDir})
  await _writeFrameScript({outDir})
}
