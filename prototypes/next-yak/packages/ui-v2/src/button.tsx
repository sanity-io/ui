import {css, styled} from 'next-yak'
import type {ComponentPropsWithRef, ReactNode} from 'react'

import {type Mode, type RadiusKey, type SpaceKey, type Tone, vars} from './theme.yak.ts'

/**
 * v2: a new component declared *before* `Root` in the same file. next-yak numbers identifiers
 * per file in source order, so this single addition renumbers every class name below it —
 * the same thing the 4.4.3 → 4.4.4 refactor did to vanilla-extract's per-file counters.
 */
export const Badge = styled.span`
  display: inline-block;
  padding: 0 ${vars.space[2]};
  border-radius: 999px;
  font-family: ${vars.font.family};
  font-size: 11px;
  line-height: 18px;
  font-weight: ${vars.font.weight.semibold};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background-color: ${vars.color.tone.primary.tintBg};
  color: ${vars.color.tone.primary.text};
`

type Weight = keyof typeof vars.font.weight

interface RootProps {
  $tone: Tone
  $mode: Mode
  $radius: RadiusKey
  $padding: SpaceKey
  $weight: Weight
  $fill: boolean
}

/**
 * Variants in next-yak are conditional `css` literals *inside* the runtime function: every
 * branch compiles to its own static class (named after the condition) and the runtime toggles
 * the class. `${vars.*}` interpolations are compiler-resolved cross-file constants from
 * `theme.yak.ts`, so every branch is fully static CSS — no inline styles for tone/mode.
 *
 * Pitfall (verified in this prototype): a module-level record of mixins looked up at runtime,
 * `const toneStyles = {primary: css\`…\`, …}` + `${({$tone}) => toneStyles[$tone]}`, compiles
 * without any error or warning to empty `css()` calls and emits NO CSS. Non-exported mixins are
 * only materialized where the compiler can see them used statically.
 *
 * The comparisons are type-checked: `$tone === 'primry'` is TS2367 (no overlap with `Tone`).
 */
const Root = styled.button<RootProps>`
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${vars.space[2]};
  box-sizing: border-box;
  margin: 0;
  border: 0;
  font-family: ${vars.font.family};
  font-size: ${vars.font.size};
  line-height: ${vars.font.lineHeight};
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  outline: none;
  transition:
    background-color 100ms,
    box-shadow 100ms;

  /* Dynamic styles: resolved per render and written to an inline custom property */
  /* v2: font-weight became a dynamic prop (adds one more numbered identifier) */
  font-weight: ${({$weight}) => vars.font.weight[$weight]};
  padding: ${({$padding}) => vars.space[$padding]};
  border-radius: ${({$radius}) => vars.radius[$radius]};
  width: ${({$fill}) => ($fill ? '100%' : 'auto')};

  /* Tone: assigns the button-local custom properties the mode rules consume */
  ${({$tone}) =>
    $tone === 'primary'
      ? css`
          --sui-btn-bg: ${vars.color.tone.primary.bg};
          --sui-btn-fg: ${vars.color.tone.primary.fg};
          --sui-btn-border: ${vars.color.tone.primary.border};
          --sui-btn-hover-bg: ${vars.color.tone.primary.hoverBg};
          --sui-btn-pressed-bg: ${vars.color.tone.primary.pressedBg};
          --sui-btn-text: ${vars.color.tone.primary.text};
          --sui-btn-tint-bg: ${vars.color.tone.primary.tintBg};
          /* v2: primary calls to action are uppercase */
          text-transform: uppercase;
          letter-spacing: 0.04em;
        `
      : $tone === 'positive'
        ? css`
            --sui-btn-bg: ${vars.color.tone.positive.bg};
            --sui-btn-fg: ${vars.color.tone.positive.fg};
            --sui-btn-border: ${vars.color.tone.positive.border};
            --sui-btn-hover-bg: ${vars.color.tone.positive.hoverBg};
            --sui-btn-pressed-bg: ${vars.color.tone.positive.pressedBg};
            --sui-btn-text: ${vars.color.tone.positive.text};
            --sui-btn-tint-bg: ${vars.color.tone.positive.tintBg};
          `
        : $tone === 'caution'
          ? css`
              --sui-btn-bg: ${vars.color.tone.caution.bg};
              --sui-btn-fg: ${vars.color.tone.caution.fg};
              --sui-btn-border: ${vars.color.tone.caution.border};
              --sui-btn-hover-bg: ${vars.color.tone.caution.hoverBg};
              --sui-btn-pressed-bg: ${vars.color.tone.caution.pressedBg};
              --sui-btn-text: ${vars.color.tone.caution.text};
              --sui-btn-tint-bg: ${vars.color.tone.caution.tintBg};
            `
          : $tone === 'critical'
            ? css`
                --sui-btn-bg: ${vars.color.tone.critical.bg};
                --sui-btn-fg: ${vars.color.tone.critical.fg};
                --sui-btn-border: ${vars.color.tone.critical.border};
                --sui-btn-hover-bg: ${vars.color.tone.critical.hoverBg};
                --sui-btn-pressed-bg: ${vars.color.tone.critical.pressedBg};
                --sui-btn-text: ${vars.color.tone.critical.text};
                --sui-btn-tint-bg: ${vars.color.tone.critical.tintBg};
              `
            : css`
                --sui-btn-bg: ${vars.color.tone.default.bg};
                --sui-btn-fg: ${vars.color.tone.default.fg};
                --sui-btn-border: ${vars.color.tone.default.border};
                --sui-btn-hover-bg: ${vars.color.tone.default.hoverBg};
                --sui-btn-pressed-bg: ${vars.color.tone.default.pressedBg};
                --sui-btn-text: ${vars.color.tone.default.text};
                --sui-btn-tint-bg: ${vars.color.tone.default.tintBg};
              `}

  /* Mode: how the tone's custom properties are applied */
  ${({$mode}) =>
    $mode === 'ghost'
      ? css`
          background-color: transparent;
          color: var(--sui-btn-text);
          box-shadow: inset 0 0 0 1px var(--sui-btn-border);

          &:not(:disabled):hover {
            background-color: var(--sui-btn-tint-bg);
          }

          &:not(:disabled):active,
          &[data-selected] {
            background-color: var(--sui-btn-tint-bg);
            box-shadow: inset 0 0 0 1px var(--sui-btn-text);
          }
        `
      : $mode === 'bleed'
        ? css`
            background-color: transparent;
            color: var(--sui-btn-text);
            box-shadow: none;

            &:not(:disabled):hover {
              background-color: var(--sui-btn-tint-bg);
            }

            &:not(:disabled):active,
            &[data-selected] {
              background-color: var(--sui-btn-tint-bg);
            }
          `
        : css`
            background-color: var(--sui-btn-bg);
            color: var(--sui-btn-fg);
            /* v2: default mode gained a drop shadow */
            box-shadow:
              inset 0 0 0 1px var(--sui-btn-border),
              0 1px 2px rgba(0, 0, 0, 0.12);

            &:not(:disabled):hover {
              background-color: var(--sui-btn-hover-bg);
            }

            &:not(:disabled):active,
            &[data-selected] {
              background-color: var(--sui-btn-pressed-bg);
            }
          `}

  &:focus-visible {
    outline: ${vars.focusRing.width} solid ${vars.color.focusRing};
    outline-offset: ${vars.focusRing.offset};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`

const Icon = styled.span`
  display: inline-flex;
  width: 1.25em;
  height: 1.25em;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 100%;
    height: 100%;
  }
`

const Text = styled.span`
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LoadingBox = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  background-color: inherit;
`

export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children' | 'width'> {
  tone?: Tone
  mode?: Mode
  radius?: RadiusKey
  padding?: SpaceKey
  /** v2: new prop */
  textWeight?: Weight
  text?: ReactNode
  icon?: ReactNode
  selected?: boolean
  loading?: boolean
  width?: 'fill'
}

export function Button(props: ButtonProps) {
  const {
    tone = 'default',
    mode = 'default',
    // v2: rounder and bolder defaults
    radius = 3,
    padding = 3,
    textWeight = 'semibold',
    text,
    icon,
    selected,
    loading,
    width,
    disabled,
    type = 'button',
    ...rest
  } = props
  return (
    <Root
      data-ui="Button"
      data-tone={tone}
      data-mode={mode}
      data-selected={selected ? '' : undefined}
      aria-busy={loading || undefined}
      {...rest}
      $tone={tone}
      $mode={mode}
      $radius={radius}
      $padding={padding}
      $weight={textWeight}
      $fill={width === 'fill'}
      disabled={Boolean(disabled || loading)}
      type={type}
    >
      {icon && <Icon aria-hidden>{icon}</Icon>}
      {text && <Text>{text}</Text>}
      {loading && <LoadingBox aria-hidden>…</LoadingBox>}
    </Root>
  )
}
