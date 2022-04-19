import path from 'path'
import {Extractor, ExtractorConfig, ExtractorMessage} from '@microsoft/api-extractor'
import {ApiPackage} from '@microsoft/api-extractor-model'
import {TSDocConfigFile} from '@microsoft/tsdoc-config'
import {createApiExtractorConfig} from './apiExtractorConfig'
import {createTempDir} from './helpers'
import {createTSDocConfig} from './tsDocConfig'
import {TSDocCustomTag} from './types'

/**
 * @public
 */
export interface ExtractResult {
  apiPackage: ApiPackage
  exportPath?: string
  messages: ExtractorMessage[]
  tempDirPath: string
}

/**
 * @public
 */
export async function extract(
  packagePath: string,
  options: {
    customTags?: TSDocCustomTag[]
    tsconfigPath?: string
  } = {}
): Promise<ExtractResult[]> {
  const {customTags = [], tsconfigPath} = options
  const tempDir = await createTempDir()
  const tempDirPath = tempDir.path
  const tsdocConfigFile = await createTSDocConfig({customTags})
  const packageJsonFullPath = path.resolve(packagePath, 'package.json')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(packageJsonFullPath)

  if (!pkg.types) {
    throw new Error(`package is missing \`types\` property (name=${pkg.name})`)
  }

  const exports: {type: 'export'; path?: string; typesPath: string}[] = []
  const types = pkg.typesVersions?.['*']

  if (pkg.exports) {
    for (const [exportPath] of Object.entries(pkg.exports)) {
      const isRoot = exportPath === '.'
      const subPath = isRoot ? undefined : path.relative('root', path.join('root', exportPath))
      const typesPath = subPath ? types?.[subPath]?.[0] : pkg.types

      if (!typesPath) {
        throw new Error(`[${pkg.name}] missing types path`)
      }

      exports.push({
        type: 'export',
        path: subPath,
        typesPath,
      })
    }
  } else {
    const typesPath = pkg.types

    if (!typesPath) {
      throw new Error(`[${pkg.name}] missing types path`)
    }

    exports.push({
      type: 'export',
      path: undefined,
      typesPath,
    })
  }

  try {
    const results: ExtractResult[] = []

    for (const exp of exports) {
      results.push({
        exportPath: exp.path,
        ...(await _doExtract({
          typesPath: exp.typesPath,
          packagePath,
          tempDirPath,
          tsconfigPath,
          tsdocConfigFile,
          packageJsonFullPath,
        })),
      })
    }

    // Clean up temporary directory
    tempDir.cleanup()

    return results
  } catch (err) {
    // Clean up temporary directory
    tempDir.cleanup()

    throw err
  }
}

async function _doExtract(options: {
  typesPath: string
  packagePath: string
  tempDirPath: string
  tsconfigPath?: string
  tsdocConfigFile?: TSDocConfigFile
  packageJsonFullPath: string
}) {
  const {typesPath, packagePath, tempDirPath, tsconfigPath, tsdocConfigFile, packageJsonFullPath} =
    options

  // Load the API Extractor configuration
  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    configObject: createApiExtractorConfig({
      mainEntryPointFilePath: typesPath,
      packagePath,
      tempDirPath,
      tsconfigPath,
    }),
    configObjectFullPath: undefined,
    tsdocConfigFile,
    packageJsonFullPath,
  })

  const messages: ExtractorMessage[] = []

  // Invoke API Extractor
  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,
    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
    // handle messages
    messageCallback(message: ExtractorMessage) {
      messages.push(message)
      message.handled = true
    },
  })

  if (extractorResult.succeeded) {
    const apiPackage = ApiPackage.loadFromJsonFile(path.resolve(tempDirPath, 'api.json'))

    return {apiPackage, messages, tempDirPath}
  }

  throw new Error(
    `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`
  )
}
