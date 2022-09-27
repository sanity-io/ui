import {CursorResult} from 'prettier'
import parserBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import prettier from 'prettier/standalone'

export function runPrettier({
  code,
  cursorOffset,
}: {
  code: string
  cursorOffset: number
}): Promise<CursorResult> | null {
  try {
    return prettier.formatWithCursor(code, {
      bracketSpacing: false,
      cursorOffset,
      filepath: 'index.jsx',
      parser: 'babel',
      plugins: [parserBabel, prettierPluginEstree],
      printWidth: 60,
      semi: false,
      singleQuote: true,
    })
  } catch (err) {
    // Just a formatting error so we pass
    return null
  }
}
