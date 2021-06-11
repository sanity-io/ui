import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {ThemeColorBase, ThemeColorCardState} from '../../theme'
import {CardStyleProps} from './types'

export function cardStyle(
  props: CardStyleProps & ThemeProps
): Array<FlattenSimpleInterpolation | (() => FlattenSimpleInterpolation)> {
  return [cardBaseStyle, cardColorStyle(props)]
}

export function cardBaseStyle(): FlattenSimpleInterpolation {
  return css`
    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      text-decoration: none;
    }

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `
}

function vars(base: ThemeColorBase, color: ThemeColorCardState) {
  // Custom properties that may be used by other atoms
  return css`
    --card-bg-color: ${color.bg};
    --card-fg-color: ${color.fg};
    --card-focus-ring-color: ${base.focusRing};
    --card-border-color: ${color.border};
    --card-muted-fg-color: ${color.muted.fg};
    --card-accent-fg-color: ${color.accent.fg};
    --card-link-fg-color: ${color.link.fg};
    --card-code-bg-color: ${color.code.bg};
    --card-code-fg-color: ${color.code.fg};

    /* @todo: deprecate */
    --card-link-color: ${color.link.fg};
    --card-hairline-soft-color: ${color.border};
    --card-hairline-hard-color: ${color.border};

    /* @todo: rename to "--base-"? */
    --card-shadow-outline-color: ${base.shadow.outline};
    --card-shadow-umbra-color: ${base.shadow.umbra};
    --card-shadow-penumbra-color: ${base.shadow.penumbra};
    --card-shadow-ambient-color: ${base.shadow.ambient};

    /* Skeleton */
    --card-skeleton-color-from: ${color.skeleton.from};
    --card-skeleton-color-to: ${color.skeleton.to};
  `
}

export function cardColorStyle(props: CardStyleProps & ThemeProps): FlattenSimpleInterpolation {
  const {theme} = props
  const {base, card} = theme.sanity.color

  return css`
    ${vars(base, card.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${vars(base, card.disabled)}
      }

      &[data-selected] {
        ${vars(base, card.pressed)}
      }

      &:not(:disabled) {
        @media (hover: hover) {
          &:hover {
            ${vars(base, card.hovered)}
          }

          &:active {
            ${vars(base, card.pressed)}
          }
        }

        &:focus {
          ${vars(base, card.selected)}
        }

        &[aria-pressed='true'],
        [aria-selected='true'] > & {
          ${vars(base, card.selected)}
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${vars(base, card.disabled)}
      }

      &[data-selected] {
        ${vars(base, card.pressed)}
      }

      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;

          &:hover {
            ${vars(base, card.hovered)}
          }

          &:active {
            ${vars(base, card.pressed)}
          }
        }

        &:focus {
          ${vars(base, card.selected)}
        }

        [aria-selected='true'] > & {
          ${vars(base, card.selected)}
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
