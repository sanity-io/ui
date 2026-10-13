import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v1/src/button.css.ts
var accent = "var(--_2p7rc590)";
var loadingBox = "_2p7rc594";
var spinner = "_2p7rc596";
var button = createRuntimeFn({
	defaultClassName: "_2p7rc597",
	variantClassNames: {
		tone: {
			"default": "_2p7rc598",
			primary: "_2p7rc599",
			positive: "_2p7rc59a",
			caution: "_2p7rc59b",
			critical: "_2p7rc59c"
		},
		mode: {
			"default": "_2p7rc59d",
			ghost: "_2p7rc59e",
			bleed: "_2p7rc59f"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "_2p7rc59g"], [{
		tone: "default",
		mode: "bleed"
	}, "_2p7rc59h"]]
});
//#endregion
//#region lib-v1/src/version.ts
var VERSION = "1.0.0";
//#endregion
//#region lib-v1/src/button.tsx
function Button(props) {
	const { tone, mode, accent: accentColor, loading, className, style, children, ...rest } = props;
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
		children: [/* @__PURE__ */ jsx("span", { children }), loading && /* @__PURE__ */ jsx("span", {
			"data-ui": "Button-loading",
			className: "_2p7rc594",
			children: /* @__PURE__ */ jsx("span", { className: "_2p7rc596" })
		})]
	});
}
//#endregion
//#region lib-v1/src/theme.css.ts
var vars = {
	radius: { control: "var(--_2g16pg10)" },
	space: {
		inline: "var(--_2g16pg11)",
		block: "var(--_2g16pg12)"
	},
	font: {
		size: "var(--_2g16pg13)",
		weight: "var(--_2g16pg14)"
	},
	color: {
		"default": {
			bg: "var(--_2g16pg15)",
			fg: "var(--_2g16pg16)",
			border: "var(--_2g16pg17)"
		},
		primary: {
			bg: "var(--_2g16pg18)",
			fg: "var(--_2g16pg19)",
			border: "var(--_2g16pg1a)"
		},
		positive: {
			bg: "var(--_2g16pg1b)",
			fg: "var(--_2g16pg1c)",
			border: "var(--_2g16pg1d)"
		},
		caution: {
			bg: "var(--_2g16pg1e)",
			fg: "var(--_2g16pg1f)",
			border: "var(--_2g16pg1g)"
		},
		critical: {
			bg: "var(--_2g16pg1h)",
			fg: "var(--_2g16pg1i)",
			border: "var(--_2g16pg1j)"
		}
	}
};
var lightTheme = "_2g16pg1k";
var darkTheme = "_2g16pg1l";
//#endregion
export { Button, VERSION, accent, button, darkTheme, lightTheme, loadingBox, spinner, vars };
