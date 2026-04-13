import {_colorSchemeTokens} from '@sanity/ui-tokens/color/scheme'
import {fontTokens} from '@sanity/ui-tokens/font'
import {tokenSystem} from '@sanity/ui-tokens/system'
import {test} from 'vitest'

import {findEntities} from './findEntities'

test.skip('findEntities', () => {
  for (const layer of tokenSystem.layers) {
    const variants = layer.kind === 'layer' ? [''] : layer.variants

    for (const variant of variants) {
      const tokens = layer.kind === 'layer' ? layer.tokenSet : layer.tokenSets[variant]
      findEntities(tokens)
    }
  }
})

test.skip('findEntities: font styles', () => {
  const entities = findEntities(fontTokens)

  console.log('style', JSON.stringify(entities.figmaStyles[0], null, 2))
})

test('findEntities: _colorScheme', () => {
  const entities = findEntities(_colorSchemeTokens.dark)

  // const darkVars = entities.figmaVars.filter((v) => v.name.startsWith('dark/'))

  console.log('_colorScheme vars', JSON.stringify(entities.figmaVars.slice(0, 10), null, 2))
})
