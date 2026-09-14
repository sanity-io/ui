import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {type FileInfo, type Options, type Transform} from 'jscodeshift'
import {expect, it} from 'vitest'

import {clearModuleParseCache} from './parseModule'

const applyTransform = require('jscodeshift/dist/testUtils').applyTransform

export function defineInlineTest(
  module: Transform,
  options: Options,
  input: FileInfo['source'],
  expectedOutput: FileInfo['source'],
  testName?: string,
) {
  it(testName || 'transforms correctly', () => {
    const testResult = runInlineTest(
      module,
      options,
      {
        source: input,
      },
      expectedOutput,
    )

    return testResult instanceof Promise ? testResult : undefined
  })
}

function runInlineTest(
  module: Transform,
  options: Options,
  input: {
    source: FileInfo['source']
  },
  expectedOutput: FileInfo['source'],
  testOptions?: Record<string, unknown>,
) {
  const output = applyTransform(module, options, input, {
    parser: 'tsx',
    ...testOptions,
  })

  const expectation = (
    o: Promise<string | null | undefined | void> | string | null | undefined | void,
  ) => expect(o).toEqual(expectedOutput.trim())

  if (output instanceof Promise) {
    return output.then((o) => {
      expectation(o)
      return o
    })
  }

  expectation(output)
  return output
}

export function defineCrossFileTest(
  module: Transform,
  options: Options,
  styledInput: string,
  importerInput: string,
  assert: (output: string) => void,
  testName?: string,
  crossFileOptions?: {
    extraFiles?: Record<string, string>
  },
) {
  it(testName || 'transforms cross-file styled component correctly', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ui-codemod-crossfile-'))

    try {
      writeFileSync(join(dir, 'Component.styled.tsx'), styledInput.trim())
      writeFileSync(join(dir, 'Component.tsx'), importerInput.trim())

      for (const [filePath, source] of Object.entries(crossFileOptions?.extraFiles ?? {})) {
        writeFileSync(join(dir, filePath), source.trim())
      }

      const importerPath = join(dir, 'Component.tsx')
      const source = readFileSync(importerPath, 'utf8')
      const output = await applyTransform(
        module,
        options,
        {source, path: importerPath},
        {parser: 'tsx'},
      )

      assert(typeof output === 'string' ? output : '')
    } finally {
      clearModuleParseCache()
      rmSync(dir, {recursive: true, force: true})
    }
  })
}
