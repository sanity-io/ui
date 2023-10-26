import {config} from '../../config'
import {ColorHueKey} from '../../types'
import {ColorToolSwatch} from './types'

export function compileCode(palette: {hue: ColorHueKey; swatches: ColorToolSwatch[]}[]): string {
  let code = `import {ColorConfig} from './types'\n\n`

  code += `/** @internal */\n`
  code += `export const config: ColorConfig = {\n`

  // black
  code += `  black: {\n`
  code += `    title: 'Black',\n`
  code += `    hsl: [${config.black.hsl[0]}, ${config.black.hsl[1]}, ${config.black.hsl[2]}],\n`
  code += `  },\n`

  // white
  code += `  white: {\n`
  code += `    title: 'White',\n`
  code += `    hsl: [${config.white.hsl[0]}, ${config.white.hsl[1]}, ${config.white.hsl[2]}],\n`
  code += `  },\n`

  for (const color of palette) {
    const {hue, swatches} = color
    const title = `${hue.slice(0, 1).toUpperCase()}${hue.slice(1)}`

    code += `  ${hue}: {\n`
    code += `    title: '${title}',\n`
    code += `    tints: {\n`

    for (const s of swatches) {
      code += `      ${s.key}: {\n`
      code += `        title: '${title} ${s.key}',\n`
      code += `        hsl: [${s.hsl[0]}, ${s.hsl[1]}, ${s.hsl[2]}],\n`
      code += `      },\n`
    }

    code += `    },\n`
    code += `  },\n`
  }

  code += `}\n`

  return code
}
