import {buildTheme_v3} from './buildTheme_v3'

it('should build theme', () => {
  const theme = buildTheme_v3({
    tokens: {
      color: {
        '*': {
          variant: {
            tinted: {
              '*': {
                bg: {
                  0: ['50', '950'],
                },
                fg: {
                  0: ['900 50%', '100 50%'],
                },
              },
            },
          },
        },
        'primary': {
          _hue: 'purple',
        },
        'positive': {
          _hue: 'green',
        },
      },
    },
  })

  // eslint-disable-next-line no-console
  console.log('default', theme.color.light.card.default)
  // eslint-disable-next-line no-console
  console.log('primary', theme.color.light.card.primary)
  // eslint-disable-next-line no-console
  console.log(
    'primary.variant.tinted.positive',
    theme.color.light.card.primary.variant.tinted.positive,
  )
})
