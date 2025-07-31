import {basename} from 'node:path'

import type {RollupPlugin} from '@sanity/pkg-utils'
import browserslist from 'browserslist'
import {browserslistToTargets, transform} from 'lightningcss'
import type {OutputAsset} from 'rollup'

export function optimizeCss(): RollupPlugin {
  return {
    name: 'optimize-css',

    async generateBundle(_outputOptions, bundle, _isWrite) {
      for (const [fileName, assetOrChunk] of Object.entries(bundle)) {
        // find CSS assets
        if (assetOrChunk.type === 'asset') {
          const asset = assetOrChunk
          if (
            fileName.endsWith('.css') &&
            // @TODO make this configurable
            fileName.endsWith('css/index.css')
          ) {
            const sourceMapFileName = `${fileName}.map`
            await transformCss(
              asset,
              bundle[sourceMapFileName]?.type === 'asset' ? bundle[sourceMapFileName] : undefined,
            )
          }
        }
      }
    },
  }
}

async function transformCss(asset: OutputAsset, sourceMapAsset: OutputAsset | undefined) {
  const css = asset.source.toString()
  const file = asset.fileName

  const targets = browserslistToTargets(
    browserslist('> 0.2% and not dead and supports css-cascade-layers and supports flexbox-gap'),
  )
  // We're using color-mix (https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) which is in the 2023 baseline
  // const targets = browserslistToTargets(browserslist('extends browserslist-config-baseline/2023'))

  // process and minify css using lightningcss
  const lightningCssResult = transform({
    filename: file,
    code: Buffer.from(css),
    minify: true,
    cssModules: false,
    targets,
    sourceMap: sourceMapAsset ? true : false,
    inputSourceMap: sourceMapAsset ? sourceMapAsset.source.toString() : undefined,
  })

  if (lightningCssResult.warnings.length) {
    // eslint-disable-next-line no-console
    console.warn(lightningCssResult.warnings)
  }

  asset.source = new TextDecoder().decode(lightningCssResult.code)
  if (sourceMapAsset && lightningCssResult.map) {
    sourceMapAsset.source = new TextDecoder().decode(lightningCssResult.map)
    asset.source += `\n//# sourceMappingURL=${basename(sourceMapAsset.fileName)}`
  }
}
