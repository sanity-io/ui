import path from 'path'
import {Extractor, ExtractorConfig, ExtractorMessage} from '@microsoft/api-extractor'
import {ApiPackage} from '@microsoft/api-extractor-model'
import {createApiExtractorConfig} from './apiExtractorConfig'
import {createTmpDir} from './helpers'

/**
 * @public
 */
export interface ExtractResult {
  apiPackage: ApiPackage
  messages: ExtractorMessage[]
  tmpDirPath: string
}

/**
 * @public
 */
export async function extract(
  inputPath: string,
  opts: {
    packagePath: string
    tsconfigPath?: string
  }
): Promise<ExtractResult> {
  const tmpDir = await createTmpDir()
  const tmpDirPath = tmpDir.path

  // Load the API Extractor configuration
  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    configObject: createApiExtractorConfig({
      mainEntryPointFilePath: inputPath,
      packagePath: opts.packagePath,
      tempDirPath: tmpDirPath,
      tsconfigPath: opts.tsconfigPath,
    }),
    configObjectFullPath: path.resolve(__dirname, '__api-extractor.json'),
    packageJsonFullPath: path.resolve(opts.packagePath, 'package.json'),
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
    const apiPackage = ApiPackage.loadFromJsonFile(path.resolve(tmpDirPath, 'api.json'))

    // Clean up temporary directory
    tmpDir.cleanup()

    return {apiPackage, messages, tmpDirPath}
  }

  // Clean up temporary directory
  tmpDir.cleanup()

  throw new Error(
    `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`
  )
}
