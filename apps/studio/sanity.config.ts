export default {
  root: true,
  project: {
    name: 'Design',
  },
  api: {
    projectId: 'mos42crl',
    dataset: 'production',
  },
  plugins: [
    '@sanity/base',
    '@sanity/default-layout',
    '@sanity/default-login',
    '@sanity/desk-tool',
    '@sanity/production-preview',
    '@sanity/code-input',
  ],
  env: {
    development: {
      plugins: ['@sanity/vision'],
    },
  },
  parts: [
    {
      name: 'part:@sanity/base/schema',
      path: './parts/schema',
    },
    {
      implements: 'part:@sanity/production-preview/resolve-production-url',
      path: './parts/resolveProductionUrl',
    },
    {
      name: 'part:@sanity/desk-tool/structure',
      path: './parts/structure',
    },
    {
      implements: 'part:@sanity/base/brand-logo',
      path: './parts/logo',
    },
  ],
}
