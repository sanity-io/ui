import type {SanityFigmaFontStyleNode} from '../types/styles'

export async function createFontStyleStyle(
  key: string,
  node: SanityFigmaFontStyleNode,
  _allVariableIdsMap: Map<string, string>,
  disableCache: boolean,
) {
  // eslint-disable-next-line no-console
  console.log('Create font style...', key)

  const fontFamily = node.token.family.$extensions['io.sanity'].figma.value
  const textBoxEdge = node.token.family.$extensions['io.sanity'].textBoxEdge

  // Load all font weights
  for (const weightToken of Object.values(node.token.weight)) {
    const fontWeight = weightToken.$extensions['io.sanity'].figma.value
    await loadFontOnce(fontFamily, fontWeight)
  }

  for (const [size, sizeToken] of Object.entries(node.token.scale)) {
    for (const [weight, weightToken] of Object.entries(node.token.weight)) {
      const name = `${key}/${size}/${weight}`
      const fontWeight = weightToken.$extensions['io.sanity'].figma.value

      const fontSize = sizeToken.$value.fontSize
      const lineHeight = sizeToken.$extensions['io.sanity'].lineHeight
      const letterSpacing = sizeToken.$value.letterSpacing

      const s = await getOrCreateTextStyle(name)

      const cacheKey = JSON.stringify({
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing,
        textBoxEdge,
      })

      if (!disableCache && s.getPluginData('sanity-ui-tokens') === cacheKey) {
        return
      }

      s.fontName = {
        family: fontFamily,
        style: fontWeight,
      }

      s.fontSize = typeof fontSize === 'string' ? 16 : fontSize.value

      s.letterSpacing = {
        unit: 'PIXELS',
        value: typeof letterSpacing === 'string' ? 0 : letterSpacing.value,
      }

      s.lineHeight = {
        unit: 'PIXELS',
        value: typeof lineHeight === 'string' ? 1 : lineHeight.value,
      }

      s.leadingTrim = textBoxEdge === 'cap-height' ? 'CAP_HEIGHT' : 'NONE'

      s.setPluginData('sanity-ui-tokens', cacheKey)
    }
  }
}

/**
 * Get or create a text style by name
 */
async function getOrCreateTextStyle(name: string): Promise<TextStyle> {
  const styles = await figma.getLocalTextStylesAsync()
  const trimmedName = name.trim()

  let style = styles.find((s) => s.name.trim() === trimmedName)

  if (!style) {
    style = figma.createTextStyle()
    style.name = trimmedName
    // logger.debug(`✨ Created new text style: "${trimmedName}"`)
  } else {
    // logger.debug(`✓ Found existing text style: "${trimmedName}"`)
  }

  return style
}

// Cache for loaded fonts to avoid redundant loads
const loadedFonts = new Set<string>()

/**
 * Load a font once (cached)
 */
async function loadFontOnce(family: string, style: string): Promise<void> {
  const key = `${family}:${style}`
  if (loadedFonts.has(key)) {
    return
  }

  await figma.loadFontAsync({family, style})
  loadedFonts.add(key)
}
