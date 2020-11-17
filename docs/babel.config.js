module.exports = {
  presets: [['next/babel', {'preset-react': {runtime: 'classic'}}]],
  plugins: [['styled-components', {ssr: true}]],
}
