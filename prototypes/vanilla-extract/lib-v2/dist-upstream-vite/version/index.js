import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v2/src/button.css.ts
var accent = "var(--_3kvj3nq0)";
var button = createRuntimeFn({
	defaultClassName: "_3kvj3nq4",
	variantClassNames: {
		tone: {
			"default": "_3kvj3nq5",
			primary: "_3kvj3nq6",
			positive: "_3kvj3nq7",
			caution: "_3kvj3nq8",
			critical: "_3kvj3nq9"
		},
		mode: {
			"default": "_3kvj3nqa",
			ghost: "_3kvj3nqb",
			bleed: "_3kvj3nqc"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "_3kvj3nqd"], [{
		tone: "default",
		mode: "bleed"
	}, "_3kvj3nqe"]]
});
var iconBox = "_3kvj3nqf";
var loadingBox = "_3kvj3nqg";
var spinner = "_3kvj3nqi";
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
				className: "_3kvj3nqf",
				children: icon
			}),
			/* @__PURE__ */ jsx("span", { children }),
			loading && /* @__PURE__ */ jsx("span", {
				"data-ui": "Button-loading",
				className: "_3kvj3nqg",
				children: /* @__PURE__ */ jsx("span", { className: "_3kvj3nqi" })
			})
		]
	});
}
//#endregion
//#region lib-v2/src/theme.css.ts
var vars = {
	radius: { control: "var(--e4y5l7w0)" },
	space: {
		inline: "var(--e4y5l7w1)",
		block: "var(--e4y5l7w2)",
		gap: "var(--e4y5l7w3)"
	},
	font: {
		size: "var(--e4y5l7w4)",
		weight: "var(--e4y5l7w5)"
	},
	color: {
		"default": {
			bg: "var(--e4y5l7w6)",
			fg: "var(--e4y5l7w7)",
			border: "var(--e4y5l7w8)"
		},
		primary: {
			bg: "var(--e4y5l7w9)",
			fg: "var(--e4y5l7wa)",
			border: "var(--e4y5l7wb)"
		},
		positive: {
			bg: "var(--e4y5l7wc)",
			fg: "var(--e4y5l7wd)",
			border: "var(--e4y5l7we)"
		},
		caution: {
			bg: "var(--e4y5l7wf)",
			fg: "var(--e4y5l7wg)",
			border: "var(--e4y5l7wh)"
		},
		critical: {
			bg: "var(--e4y5l7wi)",
			fg: "var(--e4y5l7wj)",
			border: "var(--e4y5l7wk)"
		}
	}
};
var lightTheme = "e4y5l7wl";
var darkTheme = "e4y5l7wm";
//#endregion
export { Button, VERSION, accent, button, darkTheme, iconBox, lightTheme, loadingBox, spinner, vars };
