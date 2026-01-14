import {basename} from 'node:path'
import browserslist from 'browserslist'
import {browserslistToTargets, transform} from 'lightningcss'
import type {OutputAsset, Plugin} from 'rollup'

export function optimizeCss(options: {
  extractFileName: string
  browserslist: string | string[]
}): Plugin {
  return {
    name: 'optimize-css',

    async generateBundle(_outputOptions, bundle, _isWrite) {
      for (const [fileName, assetOrChunk] of Object.entries(bundle)) {
        // find CSS assets
        if (assetOrChunk.type === 'asset') {
          const asset = assetOrChunk
          if (asset.originalFileNames.includes(options.extractFileName)) {
            const sourceMapFileName = `${fileName}.map`
            await transformCss(
              asset,
              bundle[sourceMapFileName]?.type === 'asset' ? bundle[sourceMapFileName] : undefined,
              options.browserslist,
            )
          }
        }
      }
    },
  }
}

async function transformCss(
  asset: OutputAsset,
  sourceMapAsset: OutputAsset | undefined,
  browserslistConfig: string | string[],
) {
  const css = asset.source.toString()
  const file = asset.fileName

  const targets = browserslistToTargets(browserslist(browserslistConfig))

  // process and minify css using lightningcss
  const lightningCssResult = transform({
    filename: file,
    code: Buffer.from(css),
    minify: true,
    cssModules: false,
    targets,
    sourceMap: !!sourceMapAsset,
    inputSourceMap: sourceMapAsset ? sourceMapAsset.source.toString() : undefined,
  })

  if (lightningCssResult.warnings.length) {
    // eslint-disable-next-line no-console
    console.warn(lightningCssResult.warnings)
  }

  asset.source = new TextDecoder().decode(lightningCssResult.code)
  if (sourceMapAsset && lightningCssResult.map) {
    sourceMapAsset.source = new TextDecoder().decode(lightningCssResult.map)
    asset.source += `\n/*# sourceMappingURL=${basename(sourceMapAsset.fileName)}*/\n`
  }
}
