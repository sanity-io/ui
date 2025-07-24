import type {RollupPlugin} from '@sanity/pkg-utils'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import {transform} from 'lightningcss'
import path from 'path'
import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'
import {cwd} from 'process'

const DEFAULT_ASSET_FILE_NAME = ({name}: {name: string}) => `${name}.css`

export function cssBundle(options: {
  assetFileName?: (assetFileNameOptions: {name: string}) => string
  cleanAssets?: boolean
}): RollupPlugin {
  const {assetFileName = DEFAULT_ASSET_FILE_NAME, cleanAssets = false} = options

  let sourceAssets: {
    sourceFileName: string
    outputFileName: string
    source: string
  }[] = []

  return {
    name: 'css-bundle',

    buildStart() {
      // reset
      sourceAssets = []
    },

    async generateBundle(outputOptions, bundle) {
      const outputPath = path.resolve(cwd(), outputOptions.dir ?? '')

      const entryChunks: {
        sourceFileName: string
        outputFileName: string
        modules: string[]
      }[] = []

      for (const [key, assetOrChunk] of Object.entries(bundle)) {
        // find entry chunks
        if (assetOrChunk.type === 'chunk') {
          const chunk = assetOrChunk

          if (chunk.isEntry && chunk.facadeModuleId) {
            const sourceFileName = chunk.facadeModuleId
            const outputFileName = path.resolve(outputPath, chunk.fileName)

            entryChunks.push({
              sourceFileName,
              outputFileName,
              modules: Object.keys(chunk.modules),
            })
          }

          continue
        }

        // find CSS assets
        if (assetOrChunk.type === 'asset') {
          const asset = assetOrChunk

          if (asset.fileName.endsWith('.css')) {
            const {fileName, names, source} = asset

            if (names.length > 0) {
              sourceAssets.push({
                sourceFileName: path.resolve(cwd(), names[0]),
                outputFileName: path.resolve(outputPath, fileName),
                source: source.toString(),
              })

              if (cleanAssets) {
                delete bundle[key]
              }
            }
          }
        }
      }

      // create a CSS bundle for each entry chunk
      for (const entryChunk of entryChunks) {
        const cssSources: string[] = []

        for (const moduleId of entryChunk.modules) {
          // find vanilla-extract CSS files
          if (moduleId.endsWith('.css.ts')) {
            const sourceAssetModuleId = `${moduleId}.vanilla.css`
            const sourceAsset = sourceAssets.find((a) => a.sourceFileName === sourceAssetModuleId)

            if (sourceAsset) {
              cssSources.push(sourceAsset.source)
            } else {
              // eslint-disable-next-line no-console
              console.warn(
                `CSS asset not found: ${path.relative(process.cwd(), sourceAssetModuleId)}`,
              )
            }
          }
        }

        if (cssSources.length) {
          const source = cssSources.join('\n\n') + '\n'

          const ext = path.extname(entryChunk.sourceFileName)
          const name = path.basename(entryChunk.sourceFileName, ext)
          const cssFileName = assetFileName({name})

          this.emitFile({
            type: 'asset',
            name: cssFileName,
            source: await transformCss({
              code: source,
              file: cssFileName,
            }),
          })
        }
      }
    },
  }
}

async function transformCss(options: {code: string; file: string}) {
  const {code: input, file} = options

  let css = input

  css = removeDuplicateLayers(css)

  // process using postcss
  const transformedResult = await postcss([postcssPresetEnv, autoprefixer]).process(css, {
    from: undefined,
    to: file,
  })

  css = transformedResult.css

  const minifiedResult = await cssnano({preset: 'default'}).process(css)

  css = minifiedResult.css

  // process and minify css using lightningcss
  const lightningCssResult = transform({
    filename: file,
    code: Buffer.from(css),
    minify: true,
    cssModules: false,
    sourceMap: false,
  })

  if (lightningCssResult.warnings.length) {
    // eslint-disable-next-line no-console
    console.warn(lightningCssResult.warnings)
  }

  // if (transformer === 'lightningcss') {
  //   return new TextDecoder().decode(lightningCssResult.code)
  // }

  return css
}

// match e.g. "@layer ui-theme;"
const RE_EMPTY_LAYER_RULE = /@layer\s*[^;]+;/s

function removeDuplicateLayers(css: string) {
  const lines = css.split('\n')
  const result: string[] = []

  for (const line of lines) {
    const l = line.trim()

    if (RE_EMPTY_LAYER_RULE.test(l)) {
      if (result.includes(l)) {
        continue
      }
    }

    result.push(l)
  }

  return result.join('\n')
}
