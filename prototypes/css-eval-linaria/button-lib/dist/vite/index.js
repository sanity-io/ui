import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { jsx } from "react/jsx-runtime";
//#region src/Button.tsx
/**
* Dynamic style: the `$minWidth` prop becomes a CSS custom property that the
* `@linaria/react` runtime writes to the element's inline `style`.
*/
var _exp6 = () => ((props) => props.$minWidth);
var Root = /*#__PURE__*/ styled("button")({
	name: "Root",
	class: "r7yn0dk",
	propsAsIs: false,
	vars: { "r7yn0dk-0": [_exp6(), "px"] }
});
/**
* Variants are plain `css` classes keyed by the variant union, so an unknown
* tone or mode is a type error at the call site and a missing entry here is a
* type error in the map itself.
*/
var toneClass = {
	default: "d1ii3suy",
	primary: "pb3n8vp",
	positive: "p1dloej8",
	caution: "c1ykbhho",
	critical: "c482hkv"
};
var modeClass = {
	default: "dik2j3y",
	ghost: "g11c0syb",
	bleed: "bp0tojh"
};
function Button(props) {
	const { children, className, disabled, minWidth = 0, mode = "default", tone = "default", ...rest } = props;
	return /* @__PURE__ */ jsx(Root, {
		...rest,
		$minWidth: minWidth,
		className: cx(toneClass[tone], modeClass[mode], className),
		"data-disabled": disabled ? "" : void 0,
		"data-mode": mode,
		"data-tone": tone,
		disabled,
		type: "button",
		children: jsx("span", { children })
	});
}
//#endregion
//#region src/theme.ts
/**
* Token contract: every design token is a CSS custom property. The object is
* the single source of truth for token *names*; themes assign *values*.
*/
var tokens = {
	color: {
		bg: "--sui-color-bg",
		fg: "--sui-color-fg",
		border: "--sui-color-border",
		focusRing: "--sui-color-focus-ring"
	},
	tone: {
		default: {
			bg: "--sui-tone-default-bg",
			bgHover: "--sui-tone-default-bg-hover",
			fg: "--sui-tone-default-fg",
			border: "--sui-tone-default-border",
			text: "--sui-tone-default-text"
		},
		primary: {
			bg: "--sui-tone-primary-bg",
			bgHover: "--sui-tone-primary-bg-hover",
			fg: "--sui-tone-primary-fg",
			border: "--sui-tone-primary-border",
			text: "--sui-tone-primary-text"
		},
		positive: {
			bg: "--sui-tone-positive-bg",
			bgHover: "--sui-tone-positive-bg-hover",
			fg: "--sui-tone-positive-fg",
			border: "--sui-tone-positive-border",
			text: "--sui-tone-positive-text"
		},
		caution: {
			bg: "--sui-tone-caution-bg",
			bgHover: "--sui-tone-caution-bg-hover",
			fg: "--sui-tone-caution-fg",
			border: "--sui-tone-caution-border",
			text: "--sui-tone-caution-text"
		},
		critical: {
			bg: "--sui-tone-critical-bg",
			bgHover: "--sui-tone-critical-bg-hover",
			fg: "--sui-tone-critical-fg",
			border: "--sui-tone-critical-border",
			text: "--sui-tone-critical-text"
		}
	},
	radius: {
		1: "--sui-radius-1",
		2: "--sui-radius-2"
	},
	space: {
		2: "--sui-space-2",
		3: "--sui-space-3"
	},
	font: {
		size1: "--sui-font-size-1",
		family: "--sui-font-family"
	}
};
/**
* `var()` reference to a token. Only accepts names from the contract, so a
* typo like `v('--sui-color-background')` is a compile error.
*/
function v(token) {
	return `var(${token})`;
}
var lightTheme = {
	"--sui-color-bg": "#ffffff",
	"--sui-color-fg": "#1f2430",
	"--sui-color-border": "#d3d8e0",
	"--sui-color-focus-ring": "#3b82f6",
	"--sui-tone-default-bg": "#f0f2f5",
	"--sui-tone-default-bg-hover": "#e2e6ec",
	"--sui-tone-default-fg": "#1f2430",
	"--sui-tone-default-border": "#c5ccd6",
	"--sui-tone-default-text": "#1f2430",
	"--sui-tone-primary-bg": "#2276fc",
	"--sui-tone-primary-bg-hover": "#1a5fd0",
	"--sui-tone-primary-fg": "#ffffff",
	"--sui-tone-primary-border": "#1a5fd0",
	"--sui-tone-primary-text": "#1a5fd0",
	"--sui-tone-positive-bg": "#3ab667",
	"--sui-tone-positive-bg-hover": "#2e9a56",
	"--sui-tone-positive-fg": "#ffffff",
	"--sui-tone-positive-border": "#2e9a56",
	"--sui-tone-positive-text": "#1f7a40",
	"--sui-tone-caution-bg": "#fbd024",
	"--sui-tone-caution-bg-hover": "#e3b813",
	"--sui-tone-caution-fg": "#3b2f00",
	"--sui-tone-caution-border": "#e3b813",
	"--sui-tone-caution-text": "#8a6d00",
	"--sui-tone-critical-bg": "#f03e2f",
	"--sui-tone-critical-bg-hover": "#d12e20",
	"--sui-tone-critical-fg": "#ffffff",
	"--sui-tone-critical-border": "#d12e20",
	"--sui-tone-critical-text": "#b4261a",
	"--sui-radius-1": "3px",
	"--sui-radius-2": "6px",
	"--sui-space-2": "8px",
	"--sui-space-3": "12px",
	"--sui-font-size-1": "13px",
	"--sui-font-family": "Inter, system-ui, sans-serif"
};
var darkTheme = {
	...lightTheme,
	"--sui-color-bg": "#13141b",
	"--sui-color-fg": "#e6e8ee",
	"--sui-color-border": "#2f3340",
	"--sui-tone-default-bg": "#262a36",
	"--sui-tone-default-bg-hover": "#333848",
	"--sui-tone-default-fg": "#e6e8ee",
	"--sui-tone-default-border": "#3a4050",
	"--sui-tone-default-text": "#e6e8ee",
	"--sui-tone-primary-text": "#7fb0ff",
	"--sui-tone-positive-text": "#6fd394",
	"--sui-tone-caution-text": "#f5d45a",
	"--sui-tone-critical-text": "#ff8a7e"
};
/**
* Theme scopes are plain classes that set the token variables. `declarations`
* runs at build time inside the wyw-in-js evaluator, so the CSS output holds
* literal `--sui-*: value;` lines and nothing is left for the browser to do.
*/
var themeLight = "t1czagbo";
var themeDark = "t1ujdjs9";
//#endregion
export { Button, darkTheme, lightTheme, themeDark, themeLight, tokens, v };
