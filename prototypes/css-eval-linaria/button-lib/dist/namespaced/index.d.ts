import { ButtonHTMLAttributes, ReactNode } from "react";
//#region src/Button.d.ts
type ButtonTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical';
type ButtonMode = 'default' | 'ghost' | 'bleed';
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: ReactNode;
  disabled?: boolean;
  /** Minimum width in px (dynamic style, see `Root`). */
  minWidth?: number;
  mode?: ButtonMode;
  tone?: ButtonTone;
}
export declare function Button(props: ButtonProps): import("react").JSX.Element;
//#endregion
//#region src/theme.d.ts
/**
 * Token contract: every design token is a CSS custom property. The object is
 * the single source of truth for token *names*; themes assign *values*.
 */
export declare const tokens: {
  readonly color: {
    readonly bg: '--sui-color-bg';
    readonly fg: '--sui-color-fg';
    readonly border: '--sui-color-border';
    readonly focusRing: '--sui-color-focus-ring';
  };
  readonly tone: {
    readonly default: {
      readonly bg: '--sui-tone-default-bg';
      readonly bgHover: '--sui-tone-default-bg-hover';
      readonly fg: '--sui-tone-default-fg';
      readonly border: '--sui-tone-default-border';
      readonly text: '--sui-tone-default-text';
    };
    readonly primary: {
      readonly bg: '--sui-tone-primary-bg';
      readonly bgHover: '--sui-tone-primary-bg-hover';
      readonly fg: '--sui-tone-primary-fg';
      readonly border: '--sui-tone-primary-border';
      readonly text: '--sui-tone-primary-text';
    };
    readonly positive: {
      readonly bg: '--sui-tone-positive-bg';
      readonly bgHover: '--sui-tone-positive-bg-hover';
      readonly fg: '--sui-tone-positive-fg';
      readonly border: '--sui-tone-positive-border';
      readonly text: '--sui-tone-positive-text';
    };
    readonly caution: {
      readonly bg: '--sui-tone-caution-bg';
      readonly bgHover: '--sui-tone-caution-bg-hover';
      readonly fg: '--sui-tone-caution-fg';
      readonly border: '--sui-tone-caution-border';
      readonly text: '--sui-tone-caution-text';
    };
    readonly critical: {
      readonly bg: '--sui-tone-critical-bg';
      readonly bgHover: '--sui-tone-critical-bg-hover';
      readonly fg: '--sui-tone-critical-fg';
      readonly border: '--sui-tone-critical-border';
      readonly text: '--sui-tone-critical-text';
    };
  };
  readonly radius: {
    readonly 1: '--sui-radius-1';
    readonly 2: '--sui-radius-2';
  };
  readonly space: {
    readonly 2: '--sui-space-2';
    readonly 3: '--sui-space-3';
  };
  readonly font: {
    readonly size1: '--sui-font-size-1';
    readonly family: '--sui-font-family';
  };
};
type Leaves<T> = T extends string ? T : { [K in keyof T]: Leaves<T[K]>; }[keyof T];
/** Union of every token name (`--sui-...`). */
type TokenName = Leaves<typeof tokens>;
/**
 * `var()` reference to a token. Only accepts names from the contract, so a
 * typo like `v('--sui-color-background')` is a compile error.
 */
export declare function v<T extends TokenName>(token: T): `var(${T})`;
/** A theme must assign every token exactly once. */
type ThemeValues = Record<TokenName, string>;
export declare const lightTheme: ThemeValues;
export declare const darkTheme: ThemeValues;
/**
 * Theme scopes are plain classes that set the token variables. `declarations`
 * runs at build time inside the wyw-in-js evaluator, so the CSS output holds
 * literal `--sui-*: value;` lines and nothing is left for the browser to do.
 */
export declare const themeLight: import("@linaria/core").LinariaClassName;
export declare const themeDark: import("@linaria/core").LinariaClassName;
//#endregion
export type { ButtonMode, ButtonProps, ButtonTone, ThemeValues, TokenName };