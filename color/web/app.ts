import {color, COLOR_HUES, COLOR_TINTS} from '../src'

const rootElement = document.getElementById('root')

for (const hueKey of COLOR_HUES) {
  const hue = color[hueKey]

  // Create hue element
  const hueElement = document.createElement('div')

  hueElement.className = 'hue'
  hueElement.appendChild(document.createTextNode(hueKey))

  for (const tintKey of COLOR_TINTS) {
    const tint = hue[tintKey]

    // Create tint element
    const tintElement = document.createElement('div')
    tintElement.appendChild(document.createTextNode(tintKey))
    tintElement.style.height = '70px'
    tintElement.style.width = '70px'
    tintElement.style.backgroundColor = tint.hex
    tintElement.addEventListener('click', () => {
      navigator.clipboard.writeText(tint.hex)
    })

    hueElement.appendChild(tintElement)
  }

  rootElement.appendChild(hueElement)
}
