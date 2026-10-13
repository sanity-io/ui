import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v2/src/button.css.ts
var accent = "var(--rcew40y0)";
var button = createRuntimeFn({
	defaultClassName: "rcew40y4",
	variantClassNames: {
		tone: {
			"default": "rcew40y5",
			primary: "rcew40y6",
			positive: "rcew40y7",
			caution: "rcew40y8",
			critical: "rcew40y9"
		},
		mode: {
			"default": "rcew40ya",
			ghost: "rcew40yb",
			bleed: "rcew40yc"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "rcew40yd"], [{
		tone: "default",
		mode: "bleed"
	}, "rcew40ye"]]
});
var iconBox = "rcew40yf";
var loadingBox = "rcew40yg";
var spinner = "rcew40yi";
//#endregion
//#region lib-v2/src/version.ts
var VERSION = "2.0.0";
//#endregion
//#region lib-v2/src/button.tsx
function Button(props) {
	const { tone, mode, accent: accentColor, icon, loading, className, style, children, ...rest } = props;
	const dynamicStyle = accentColor ? assignInlineVars({ [accent]: accentColor }) : void 0;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		"data-ui": "Button",
		"data-version": VERSION,
		"data-tone": tone ?? "default",
		"data-mode": mode ?? "default",
		className: [button({
			tone,
			mode
		}), className].filter(Boolean).join(" "),
		style: dynamicStyle || style ? {
			...dynamicStyle,
			...style
		} : void 0,
		...rest,
		children: [
			icon && /* @__PURE__ */ jsx("span", {
				className: "rcew40yf",
				children: icon
			}),
			/* @__PURE__ */ jsx("span", { children }),
			loading && /* @__PURE__ */ jsx("span", {
				"data-ui": "Button-loading",
				className: "rcew40yg",
				children: /* @__PURE__ */ jsx("span", { className: "rcew40yi" })
			})
		]
	});
}
//#endregion
//#region lib-v2/src/theme.css.ts
var vars = {
	radius: { control: "var(--_154s40h0)" },
	space: {
		inline: "var(--_154s40h1)",
		block: "var(--_154s40h2)",
		gap: "var(--_154s40h3)"
	},
	font: {
		size: "var(--_154s40h4)",
		weight: "var(--_154s40h5)"
	},
	color: {
		"default": {
			bg: "var(--_154s40h6)",
			fg: "var(--_154s40h7)",
			border: "var(--_154s40h8)"
		},
		primary: {
			bg: "var(--_154s40h9)",
			fg: "var(--_154s40ha)",
			border: "var(--_154s40hb)"
		},
		positive: {
			bg: "var(--_154s40hc)",
			fg: "var(--_154s40hd)",
			border: "var(--_154s40he)"
		},
		caution: {
			bg: "var(--_154s40hf)",
			fg: "var(--_154s40hg)",
			border: "var(--_154s40hh)"
		},
		critical: {
			bg: "var(--_154s40hi)",
			fg: "var(--_154s40hj)",
			border: "var(--_154s40hk)"
		}
	}
};
var lightTheme = "_154s40hl";
var darkTheme = "_154s40hm";
//#endregion
export { Button, VERSION, accent, button, darkTheme, iconBox, lightTheme, loadingBox, spinner, vars };
