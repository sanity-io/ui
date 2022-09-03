import path from 'path'
import {ExtractorLogLevel, IExtractorMessagesConfig} from '@microsoft/api-extractor'

function getEnv(key: string) {
  const val = process.env[key]

  if (val === undefined) {
    throw new Error(`missing environment variable: ${key}`)
  }

  return val
}

const reporting: IExtractorMessagesConfig = {
  /**
   * Configures handling of diagnostic messages reported by the TypeScript compiler engine while analyzing
   * the input .d.ts files.
   *
   * TypeScript message identifiers start with "TS" followed by an integer.  For example: "TS2551"
   *
   * DEFAULT VALUE:  A single "default" entry with logLevel=warning.
   */
  compilerMessageReporting: {
    /**
     * Configures the default routing for messages that don't match an explicit rule in this table.
     */
    default: {
      /**
       * Specifies whether the message should be written to the the tool's output log.  Note that
       * the "addToApiReportFile" property may supersede this option.
       *
       * Possible values: "error", "warning", "none"
       *
       * Errors cause the build to fail and return a nonzero exit code.  Warnings cause a production build fail
       * and return a nonzero exit code.  For a non-production build (e.g. when "api-extractor run" includes
       * the "--local" option), the warning is displayed but the build will not fail.
       *
       * DEFAULT VALUE: "warning"
       */
      logLevel: 'warning' as ExtractorLogLevel,

      /**
       * When addToApiReportFile is true:  If API Extractor is configured to write an API report file (.api.md),
       * then the message will be written inside that file; otherwise, the message is instead logged according to
       * the "logLevel" option.
       *
       * DEFAULT VALUE: false
       */
      // "addToApiReportFile": false
    },

    // "TS2551": {
    //   "logLevel": "warning",
    //   "addToApiReportFile": true
    // },
    //
    // . . .
  },

  /**
   * Configures handling of messages reported by API Extractor during its analysis.
   *
   * API Extractor message identifiers start with "ae-".  For example: "ae-extra-release-tag"
   *
   * DEFAULT VALUE: See api-extractor-defaults.json for the complete table of extractorMessageReporting mappings
   */
  extractorMessageReporting: {
    default: {
      logLevel: 'warning' as ExtractorLogLevel,
      addToApiReportFile: false,
    },

    'ae-extra-release-tag': {
      logLevel: 'error' as ExtractorLogLevel,
      addToApiReportFile: false,
    },

    'ae-forgotten-export': {
      logLevel: 'error' as ExtractorLogLevel,
      addToApiReportFile: false,
    },
  },

  /**
   * Configures handling of messages reported by the TSDoc parser when analyzing code comments.
   *
   * TSDoc message identifiers start with "tsdoc-".  For example: "tsdoc-link-tag-unescaped-text"
   *
   * DEFAULT VALUE:  A single "default" entry with logLevel=warning.
   */
  tsdocMessageReporting: {
    default: {
      logLevel: 'warning' as ExtractorLogLevel,
      addToApiReportFile: false,
    },

    'tsdoc-link-tag-unescaped-text': {
      logLevel: 'warning' as ExtractorLogLevel,
      addToApiReportFile: false,
    },

    'tsdoc-unsupported-tag': {
      logLevel: 'none' as ExtractorLogLevel,
      addToApiReportFile: false,
    },

    'tsdoc-undefined-tag': {
      logLevel: 'none' as ExtractorLogLevel,
      addToApiReportFile: false,
    },
  },
}

export const config = {
  fs: {
    etcPath: path.resolve(__dirname, '../../etc/api'),
  },

  reporting,

  sanity: {
    projectId: getEnv('SANITY_PROJECT_ID'),
    dataset: getEnv('SANITY_DATASET'),
    token: process.env.SANITY_API_TOKEN,
  },

  workspace: [
    '@sanity/color',
    '@sanity/icons',
    '@sanity/logos',
    '@sanity/ui',
    '@sanity/ui-workshop',
  ],
}
