import browserslistConfig from '@sanity/browserslist-config'
import type {RollupPlugin} from '@sanity/pkg-utils'
import browserslist from 'browserslist'
import {browserslistToTargets, transform} from 'lightningcss'

export function optimizeCss(): RollupPlugin {
  return {
    name: 'optimize-css',

    async generateBundle(_outputOptions, bundle) {
      for (const [, assetOrChunk] of Object.entries(bundle)) {
        // find CSS assets
        if (assetOrChunk.type === 'asset') {
          const asset = assetOrChunk

          if (
            asset.fileName.endsWith('.css') &&
            // @TODO make this configurable
            asset.fileName.endsWith('css/index.css')
          ) {
            asset.source = await transformCss({
              code: asset.source.toString(),
              file: asset.fileName,
            })
          }
        }
      }
    },
  }
}

async function transformCss(options: {code: string; file: string}) {
  const {code: input, file} = options

  const css = input

  const targets = browserslistToTargets(browserslist(browserslistConfig))

  // process and minify css using lightningcss
  const lightningCssResult = transform({
    filename: file,
    code: Buffer.from(css),
    minify: true,
    cssModules: false,
    sourceMap: false,
    targets,
  })

  if (lightningCssResult.warnings.length) {
    // eslint-disable-next-line no-console
    console.warn(lightningCssResult.warnings)
  }

  return new TextDecoder().decode(lightningCssResult.code)
}
