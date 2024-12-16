import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import {Properties, Rules} from '../../types'

export const _selectableRules: Rules = {
  selectable: {
    'backgroundColor': 'var(--color-bg)',
    'color': 'var(--color-fg)',

    '--color-bg': 'var(--color-tinted-bg-0)',
    '--color-border': 'var(--color-tinted-border-2)',
    '--color-fg': 'var(--color-tinted-fg-2)',

    '@nest': {
      '&[data-as="button"]': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        border: 0,
        width: ['-moz-available', '-webkit-fill-available', 'stretch'],
      },

      /* &:is(a) */
      '&[data-as="a"]': {
        outline: 'none',
        textDecoration: 'none',
      },

      ...buildSelectableTones(),
    },

    '@media': {
      '(hover: hover)': {
        '@nest': {
          '&:not([data-disabled])': {
            // cursor: 'pointer',
          },

          '&:not([data-disabled]):hover': {
            '--color-bg': 'var(--color-tinted-bg-1)',
            '--color-border': 'var(--color-tinted-border-3)',
            '--color-fg': 'var(--color-tinted-fg-1)',
            // '--color-icon': 'var(--color-tinted-fg-4)',
            '--color-muted-bg': 'var(--color-solid-bg-2)',
            '--color-muted-fg': 'var(--color-solid-fg-4)',
          },

          '&:not([data-disabled]):active, &:not([data-disabled])[aria-pressed="true"], &:not([data-disabled])[data-pressed]':
            {
              '--color-bg': 'var(--color-tinted-bg-2)',
              '--color-border': 'var(--color-tinted-border-4)',
              '--color-fg': 'var(--color-tinted-fg-0)',
              // '--color-icon': 'var(--color-tinted-fg-4)',
              '--color-muted-bg': 'var(--color-solid-bg-3)',
              '--color-muted-fg': 'var(--color-solid-fg-5)',
            },

          '&:not([data-disabled]):focus': {
            '--color-bg': 'var(--color-solid-bg-0)',
            '--color-border': 'var(--color-solid-border-1)',
            '--color-fg': 'var(--color-solid-fg-1)',
            // '--color-icon': 'var(--color-solid-fg-1)',
            '--color-muted-bg': 'var(--color-solid-bg-1)',
            '--color-muted-fg': 'var(--color-solid-fg-3)',
          },

          '&[data-disabled]': {
            '--color-bg': 'var(--color-tinted-bg-0)',
            '--color-border': 'var(--color-tinted-border-1)',
            '--color-fg': 'var(--color-tinted-border-4)',
            // '--color-icon': 'var(--color-tinted-border-3)',
          },
        },
      },
    },
  },
}

function buildSelectableTones(): Record<string, Properties> {
  const rules: Record<string, Properties> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    rules[`&.selectable-tone-${tone}`] = {
      [`--color-tinted-bg-0`]: `var(--color-tinted-${tone}-bg-0)`,
      [`--color-tinted-bg-1`]: `var(--color-tinted-${tone}-bg-1)`,
      [`--color-tinted-bg-2`]: `var(--color-tinted-${tone}-bg-2)`,
      [`--color-tinted-bg-3`]: `var(--color-tinted-${tone}-bg-3)`,
      [`--color-tinted-bg-4`]: `var(--color-tinted-${tone}-bg-4)`,

      [`--color-tinted-border-0`]: `var(--color-tinted-${tone}-border-0)`,
      [`--color-tinted-border-1`]: `var(--color-tinted-${tone}-border-1)`,
      [`--color-tinted-border-2`]: `var(--color-tinted-${tone}-border-2)`,
      [`--color-tinted-border-3`]: `var(--color-tinted-${tone}-border-3)`,
      [`--color-tinted-border-4`]: `var(--color-tinted-${tone}-border-4)`,

      [`--color-tinted-fg-0`]: `var(--color-tinted-${tone}-fg-0)`,
      [`--color-tinted-fg-1`]: `var(--color-tinted-${tone}-fg-1)`,
      [`--color-tinted-fg-2`]: `var(--color-tinted-${tone}-fg-2)`,
      [`--color-tinted-fg-3`]: `var(--color-tinted-${tone}-fg-3)`,
      [`--color-tinted-fg-4`]: `var(--color-tinted-${tone}-fg-4)`,

      [`--color-solid-bg-0`]: `var(--color-solid-${tone}-bg-0)`,
      [`--color-solid-bg-1`]: `var(--color-solid-${tone}-bg-1)`,
      [`--color-solid-bg-2`]: `var(--color-solid-${tone}-bg-2)`,
      [`--color-solid-bg-3`]: `var(--color-solid-${tone}-bg-3)`,
      [`--color-solid-bg-4`]: `var(--color-solid-${tone}-bg-4)`,

      [`--color-solid-border-0`]: `var(--color-solid-${tone}-border-0)`,
      [`--color-solid-border-1`]: `var(--color-solid-${tone}-border-1)`,
      [`--color-solid-border-2`]: `var(--color-solid-${tone}-border-2)`,
      [`--color-solid-border-3`]: `var(--color-solid-${tone}-border-3)`,
      [`--color-solid-border-4`]: `var(--color-solid-${tone}-border-4)`,

      [`--color-solid-fg-0`]: `var(--color-solid-${tone}-fg-0)`,
      [`--color-solid-fg-1`]: `var(--color-solid-${tone}-fg-1)`,
      [`--color-solid-fg-2`]: `var(--color-solid-${tone}-fg-2)`,
      [`--color-solid-fg-3`]: `var(--color-solid-${tone}-fg-3)`,
      [`--color-solid-fg-4`]: `var(--color-solid-${tone}-fg-4)`,
    }
  }

  return rules
}
