import {white} from '@sanity/color'
import {parseFlag} from '$lib/config'

const __DEV__ = process.env.NODE_ENV === 'development'

/**
 * IDs of static screens
 * These are ignored from pages generated from screen IDs in the database.
 */
export const app = {
  themeColor: white.hex,
  siteName: 'Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  staticScreenIds: ['arcade', 'workshop'],
}

/**
 * The application’s base path.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/**
 * Application features.
 */
export const features = {
  /**
   * Show page loading spinner
   *
   * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_PAGE_LOADING_SPINNER=true|false`.
   * Defaults to `false`.
   */
  pageLoadingSpinner: parseFlag(process.env.NEXT_PUBLIC_FEATURE_PAGE_LOADING_SPINNER, false),

  /**
   * Fetch draft data when `true`.
   *
   * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_PREVIEW=true|false`.
   * Defaults to `true` in development.
   */
  preview: parseFlag(process.env.NEXT_PUBLIC_FEATURE_PREVIEW, __DEV__),

  /**
   * Show hints of hidden content when `true`.
   *
   * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_HINT_HIDDEN_CONTENT=true|false`.
   * Defaults to `true` in development.
   */
  hintHiddenContent: parseFlag(process.env.NEXT_PUBLIC_FEATURE_HINT_HIDDEN_CONTENT, __DEV__),
}

/**
 * Google Analytics configuration.
 */
export const ga = {
  trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
}

/**
 * Sanity client configuration.
 */
export const sanity = {
  // The Sanity API version
  apiVersion: '2021-10-21',

  // The Sanity project dataset name
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // The Sanity project ID
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',

  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
  useCdn: process.env.NODE_ENV === 'production',
}

/**
 * Workshop configuration.
 */
export const workshop = {
  collections: [
    {
      name: 'components',
      title: 'Components',
    },
    {
      name: 'hooks',
      title: 'Hooks',
    },
    {
      name: 'primitives',
      title: 'Primitives',
    },
    {
      name: 'utils',
      title: 'Utils',
    },
  ],
  features: {
    navbar: false,
  },
  frameUrl: `${basePath}/workshop/frame/`,
  title: 'Workshop',
}
