import preset from '@sanity/prettier-config'

export default {
  ...preset,
  plugins: [...preset.plugins, '@ianvs/prettier-plugin-sort-imports'],
}
