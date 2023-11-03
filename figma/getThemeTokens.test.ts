import {buildColorTheme} from '../src/theme'
import {buildTokenEntries} from './buildTokenEntries'

test('buildTokenEntries: button with transparent', () => {
  const tokens = buildTokenEntries(buildColorTheme() as any)

  console.log(tokens.join('\n'))
})
