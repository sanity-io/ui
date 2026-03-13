/* eslint-disable no-console */

import {exec as execCallback} from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {promisify} from 'node:util'

import {tokenSystem} from '@sanity/ui-tokens/system'

import type {
  _DTCGColorToken,
  _DTCGColorValue,
  _DTCGDimensionToken,
  _DTCGDimensionValue,
  _DTCGToken,
  _DTCGTokenAlias,
} from '../../src/lib/dtcg/types'
import type {SanityToken, TokenType} from '../../src/lib/types'

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

  for (const layer of tokenSystem.layers) {
    if (layer.kind === 'layer') {
      singleModeCollections.push(`${SET_DIR}/${layer.name}`)
    }
  }

  // Add system theme which enables all single mode layers
  themes.push({
    group: 'system',
    name: 'default',
    selectedTokenSets: {
      ...singleModeCollections.reduce<Record<string, string>>((acc, curr) => {
        acc[curr] = 'enabled'
        return acc
      }, {}),
    },
  })

  for (const layer of tokenSystem.layers) {
    // const modeEntries = Object.entries(layer.modes)
    // const singleMode = modeEntries.length === 1

    console.log(repeat('-', 80))

    if (layer.kind === 'layer') {
      console.log('layer:', layer.name)

      const setName = `${SET_DIR}/${layer.name}`
      const tokens = _map(layer.tokenSet)
      const layerFile = path.resolve(TOKENS_STUDIO_DIR, `${setName}.json`)

      await fs.writeFile(layerFile, JSON.stringify(tokens.result, null, 2))

      setNames.push(setName)

      console.log('-', path.relative(process.cwd(), layerFile), tokens.tokenCount)
    }

    if (layer.kind === 'variant') {
      console.log('variant layer:', layer.name, 'with', layer.variants.length, 'variants')

      for (const v of layer.variants) {
        const setName = `${SET_DIR}/${layer.name}.${v}`
        const tokens = _map(layer.tokenSets[v])
        const layerFile = path.resolve(TOKENS_STUDIO_DIR, `${setName}.json`)

        await fs.writeFile(layerFile, JSON.stringify(tokens.result, null, 2))

        setNames.push(setName)

        themes.push({
          group: layer.name,
          name: v,
          selectedTokenSets: {
            [setName]: 'enabled',
          },
        })

        console.log('-', path.relative(process.cwd(), layerFile), tokens.tokenCount)
      }
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

function _map(input: object, parentType?: TokenType) {
  const obj = {...input}

  let tokenCount = 0

  let $type: TokenType | undefined = parentType

  if ('$type' in obj) {
    $type = obj.$type as TokenType
    // delete obj.$type
  }

  if ('$value' in obj) {
    return {
      result: _mapToken({
        ...obj,
        $type,
        $value: obj.$value,
      } as SanityToken),
      tokenCount: 1,
    }
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$type') {
      continue
    }

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nested = _map(value, $type)
      result[key] = nested.result
      tokenCount += nested.tokenCount
    } else {
      result[key] = value
    }
  }

  return {result, tokenCount}
}

function _mapToken(token: SanityToken) {
  if (token.$type === 'dimension') {
    const value = token.$value

    if (typeof value === 'string') {
      return {
        $type: 'dimension',
        $value: value,
      }
    }

    return {
      $type: 'dimension',
      $value: getDimensionValue(value),
    }
  }

  if (token.$type === 'color') {
    return {
      $type: 'color',
      $value: getColorValue(token.$value),
    }
  }

  if (token.$type === 'number') {
    return {
      $type: 'number',
      $value: token.$value,
    }
  }

  if (token.$type === 'shadow') {
    if (typeof token.$value === 'string') {
      console.warn('WARNING: shadow alias value not supported by tokens-studio', token)
      return token
      // continue
    }

    const toArray = <T>(value: T | T[]): T[] => {
      if (Array.isArray(value)) {
        return value
      }
      return [value]
    }

    return {
      $type: 'boxShadow',
      $value: toArray(token.$value).map((v) => ({
        type: v.inset ? 'innerShadow' : 'dropShadow',
        x: getDimensionValue(v.offsetX),
        y: getDimensionValue(v.offsetY),
        blur: getDimensionValue(v.blur),
        spread: getDimensionValue(v.spread),
        color: getColorValue(v.color),
      })),
    }
  }

  if (token.$type === 'fontFamily') {
    return {
      $type: 'fontFamily',
      $value: token.$extensions['io.sanity'].figma.value,
    }
  }

  if (token.$type === 'string') {
    return {
      $type: 'text',
      $value: token.$value,
    }
  }

  if (token.$type === 'boolean') {
    throw new Error('not implemented: boolean')
  }

  if (token.$type === 'border') {
    throw new Error('not implemented: border')
  }

  if (token.$type === 'cubicBezier') {
    throw new Error('not implemented: cubicBezier')
  }

  if (token.$type === 'duration') {
    // throw new Error('not implemented: duration')
    console.warn(
      'WARNING: duration alias value not supported by tokens-studio, converting to string',
      token,
    )
    return {
      $type: 'string',
      $value:
        typeof token.$value === 'string'
          ? token.$value
          : `${token.$value.value}${token.$value.unit}`,
    }
  }

  if (token.$type === 'fontWeight') {
    // throw new Error('not implemented: fontWeight')
    return {
      $type: 'fontWeight',
      $value: token.$extensions['io.sanity'].figma.value,
    }
  }

  if (token.$type === 'typography') {
    // throw new Error('not implemented: typography')
    return {
      $type: 'typography',
      $value: {
        fontFamily: token.$value.fontFamily,
        fontWeight: String(token.$value.fontWeight),
        lineHeight: getDimensionValue(token.$extensions['io.sanity'].lineHeight),
        fontSize: getDimensionValue(token.$value.fontSize),
        letterSpacing: getDimensionValue(token.$value.letterSpacing),
      },
    }
  }

  throw new Error(`Unknown token type: ${JSON.stringify(token)}`)

  // return token
}

function getColorValue(value: _DTCGColorValue | _DTCGTokenAlias) {
  if (typeof value === 'string') {
    return value
  }

  if (value.colorSpace === 'srgb') {
    if (!value.hex) {
      return `rgb(${value.components.join(' ')} / ${value.alpha ?? 1})`
    }

    return value.hex || '#000000'
  }

  throw new Error(`Unknown color space: ${value.colorSpace}`)
}

function getDimensionValue(value: _DTCGDimensionValue | _DTCGTokenAlias, withUnit = true) {
  if (typeof value === 'string') {
    return value
  }

  if (!withUnit) {
    return value.value
  }

  return `${value.value}${value.unit}`
}
