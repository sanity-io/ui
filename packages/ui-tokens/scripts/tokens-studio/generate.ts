/* eslint-disable no-console */

import {exec as execCallback} from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {promisify} from 'node:util'

import {
  type DTCGColorValue,
  type DTCGDimensionValue,
  // type DTCGStringValue,
  type DTCGToken,
  type DTCGTokenAlias,
  system,
  type TokenTree,
} from '@sanity/ui-tokens/system'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ETC_DIR = path.resolve(__dirname, '../../etc')
const TOKENS_STUDIO_DIR = path.resolve(ETC_DIR, 'tokens-studio')

const SET_DIR = 'sanity'

const exec = promisify(execCallback)

async function generate() {
  try {
    // rm -rf etc/tokens-studio
    await fs.rm(path.resolve(TOKENS_STUDIO_DIR), {recursive: true})
  } catch {
    // ignore
  }

  // mkdir -p etc/tokens-studio
  await fs.mkdir(path.resolve(TOKENS_STUDIO_DIR, SET_DIR), {recursive: true})

  await generateTokensStudioSets()
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})

// repeat chr X times
const repeat = (chr: string, times: number) => Array.from({length: times}, () => chr).join('')

async function generateTokensStudioSets() {
  const setNames: string[] = []
  const themes: {
    group: string
    name: string
    selectedTokenSets: Record<string, string>
  }[] = []

  const singleModeCollections: string[] = []

  for (const collection of Object.values(system.collections)) {
    const modeEntries = Object.entries(collection.modes)
    const singleMode = modeEntries.length === 1
    if (singleMode) {
      singleModeCollections.push(`${SET_DIR}/${collection.namespace}`)
    }
  }

  // Add system theme which enables all single mode collections
  themes.push({
    group: 'System',
    name: 'default',
    selectedTokenSets: {
      ...singleModeCollections.reduce<Record<string, string>>((acc, curr) => {
        acc[curr] = 'enabled'
        return acc
      }, {}),
    },
  })

  for (const collection of Object.values(system.collections)) {
    const modeEntries = Object.entries(collection.modes)
    const singleMode = modeEntries.length === 1

    console.log(repeat('-', 80))
    if (singleMode) {
      console.log('collection:', collection.namespace)
    } else {
      console.log('collection:', collection.namespace, 'with', modeEntries.length, 'modes')
    }

    for (const [mode, modeTokens] of modeEntries) {
      const setName = singleMode
        ? `${SET_DIR}/${collection.namespace}`
        : `${SET_DIR}/${collection.namespace}.${mode}`

      setNames.push(setName)

      if (!singleMode) {
        themes.push({
          group: collection.title,
          name: mode,
          selectedTokenSets: {
            [setName]: 'enabled',
          },
        })
      }

      // make tokens compatible
      const compatTokens = mapTokensToTokensStudio(modeTokens)

      const collectionFile = path.resolve(TOKENS_STUDIO_DIR, `${setName}.json`)

      await fs.writeFile(collectionFile, JSON.stringify(compatTokens.result, null, 2))

      console.log('-', path.relative(process.cwd(), collectionFile), compatTokens.tokenCount)
      // console.log('# of tokens:', )
    }
  }

  // $metadata.json
  const metadata = {
    tokenSetOrder: setNames,
  }
  const metadataFile = path.resolve(TOKENS_STUDIO_DIR, `${SET_DIR}/$metadata.json`)
  await fs.writeFile(metadataFile, JSON.stringify(metadata, null, 2))

  // $themes.json
  const themesFile = path.resolve(TOKENS_STUDIO_DIR, `${SET_DIR}/$themes.json`)
  await fs.writeFile(themesFile, JSON.stringify(themes, null, 2))

  // prettier --write etc/tokens-studio
  await exec(`npx prettier --write ${TOKENS_STUDIO_DIR}`)
}

function mapTokensToTokensStudio(tokenTree: TokenTree, parentPath?: string) {
  let tokenCount = 0
  const result: Record<string, unknown> = {}

  for (const [key, node] of Object.entries(tokenTree)) {
    const path = parentPath ? `${parentPath}.${key}` : key

    if (isDTCGToken(node)) {
      if (node.$type === 'color') {
        result[key] = {
          $type: 'color',
          $value: getColorValue(node.$value),
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'dimension') {
        result[key] = {
          $type: 'dimension',
          $value: getDimensionValue(node.$value),
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'number') {
        result[key] = {
          $type: 'number',
          $value: node.$value,
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'shadow') {
        if (typeof node.$value === 'string') {
          // console.log(`[${path}]`, node.$value)
          console.warn('WARNING: shadow alias value not supported by tokens-studio', node)
          // result[key] = {
          //   $type: 'boxShadow',
          //   $value: node.$value,
          // }
          continue
        }

        const toArray = <T>(value: T | T[]): T[] => {
          if (Array.isArray(value)) {
            return value
          }
          return [value]
        }

        result[key] = {
          $type: 'boxShadow',
          $value: toArray(node.$value).map((v) => ({
            type: v.inset ? 'innerShadow' : 'dropShadow',
            x: getDimensionValue(v.offsetX, false),
            y: getDimensionValue(v.offsetY, false),
            blur: getDimensionValue(v.blur, false),
            spread: getDimensionValue(v.spread, false),
            color: getColorValue(v.color),
          })),
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'fontFamily') {
        result[key] = {
          $type: 'fontFamily',
          $value: node.$extensions['io.sanity'].figma.value,
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'fontWeight') {
        result[key] = {
          $type: 'fontWeight',
          $value: node.$extensions['io.sanity'].figma.value,
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'typography') {
        result[key] = {
          $type: 'typography',
          $value: {
            fontFamily: node.$value.fontFamily,
            fontWeight: String(node.$value.fontWeight),
            lineHeight: getDimensionValue(node.$extensions['io.sanity'].lineHeight),
            fontSize: getDimensionValue(node.$value.fontSize),
            letterSpacing: getDimensionValue(node.$value.letterSpacing),
          },
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'string') {
        result[key] = {
          $type: 'text',
          $value: node.$value,
        }
        tokenCount += 1
        continue
      }

      if (node.$type === 'duration') {
        console.warn(
          'WARNING: duration alias value not supported by tokens-studio, converting to string',
          node,
        )
        result[key] = {
          $type: 'string',
          $value:
            typeof node.$value === 'string'
              ? node.$value
              : `${node.$value.value}${node.$value.unit}`,
        }
        tokenCount += 1
        continue
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown token type: ${(node as any).$type}`)
    }

    const nested = mapTokensToTokensStudio(node, path)

    result[key] = nested.result
    tokenCount += nested.tokenCount
  }

  return {result, tokenCount}
}

function isDTCGToken(value: unknown): value is DTCGToken {
  return typeof value === 'object' && value !== null && '$type' in value && '$value' in value
}

function getDimensionValue(value: DTCGDimensionValue | DTCGTokenAlias, withUnit = true) {
  if (!withUnit) {
    if (typeof value === 'string') {
      return value
    }

    return value.value
  }

  if (typeof value === 'string') {
    return value
  }

  return `${value.value}${value.unit}`
}

function getColorValue(value: DTCGColorValue | DTCGTokenAlias) {
  if (typeof value === 'string') {
    return value
  }

  if (!value.hex) {
    return `rgba(${value.components.join(', ')}, ${value.alpha ?? 1})`
  }

  return value.hex || '#000000'
}

// function getStringValue(value: DTCGStringValue | DTCGTokenAlias) {
//   if (typeof value === 'string') {
//     return value
//   }

//   return value
// }
