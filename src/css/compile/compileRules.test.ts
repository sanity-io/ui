import {responsiveRules} from '../responsiveRules'
import {Rules} from '../types'
import {compileRules} from './compileRules'

it('should compile deeply nested rules', () => {
  const rules: Rules = {
    card: {
      '@nest': {
        '&:is(a)': {
          '@media': {
            '(hover: hover)': {
              background: 'red',
            },
          },
        },
      },
    },
  }

  console.log(compileRules(rules))
})

it.only('should compile responsive rules', () => {
  const rules = responsiveRules('block', {
    '@nest': {
      '&:not([hidden])': {
        display: 'block',
      },
    },
  })

  console.log(compileRules(rules))
})
