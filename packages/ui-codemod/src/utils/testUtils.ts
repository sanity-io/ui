import {type FileInfo, type Options, type Transform} from 'jscodeshift'
import {expect, it} from 'vitest'

/* eslint-disable-next-line @typescript-eslint/no-require-imports */
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
  const output = applyTransform(module, options, input, testOptions)

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
