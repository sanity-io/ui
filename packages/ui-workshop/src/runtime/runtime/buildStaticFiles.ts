import path from 'path'
import mkdirp from 'mkdirp'
import {_writeFrameHTML} from './_writeFrameHTML'
import {_writeFrameScript} from './_writeFrameScript'
import {_writeHTML} from './_writeHTML'
import {_writeScript} from './_writeScript'

export async function buildStaticFiles(options: {runtimeDir: string}): Promise<void> {
  const {runtimeDir} = options

  await mkdirp(runtimeDir)
  await _writeHTML({outDir: runtimeDir})
  await _writeScript({outDir: runtimeDir})

  await mkdirp(path.resolve(runtimeDir, 'frame'))
  await _writeFrameHTML({outDir: runtimeDir})
  await _writeFrameScript({outDir: runtimeDir})
}
