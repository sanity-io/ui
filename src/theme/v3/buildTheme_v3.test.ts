import {buildTheme_v3} from './buildTheme_v3'

it('should build theme', () => {
  const theme = buildTheme_v3({
    color: {
      '*': {
        bg: {
          1: ['50', '950'],
        },
        fg: {
          1: ['900 50%', '100 50%'],
        },
      },
      'primary': {
        _hue: 'purple',
      },
    },
  })

  // eslint-disable-next-line no-console
  console.log('default', theme.color.light.default)
  // eslint-disable-next-line no-console
  console.log('primary', theme.color.light.primary)
})
