import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v1/src/button.css.ts
var accent = "var(--lgqk170)";
var loadingBox = "lgqk174";
var spinner = "lgqk176";
var button = createRuntimeFn({
	defaultClassName: "lgqk177",
	variantClassNames: {
		tone: {
			"default": "lgqk178",
			primary: "lgqk179",
			positive: "lgqk17a",
			caution: "lgqk17b",
			critical: "lgqk17c"
		},
		mode: {
			"default": "lgqk17d",
			ghost: "lgqk17e",
			bleed: "lgqk17f"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "lgqk17g"], [{
		tone: "default",
		mode: "bleed"
	}, "lgqk17h"]]
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
			className: "lgqk174",
			children: /* @__PURE__ */ jsx("span", { className: "lgqk176" })
		})]
	});
}
//#endregion
//#region lib-v1/src/theme.css.ts
var vars = {
	radius: { control: "var(--_1u1be650)" },
	space: {
		inline: "var(--_1u1be651)",
		block: "var(--_1u1be652)"
	},
	font: {
		size: "var(--_1u1be653)",
		weight: "var(--_1u1be654)"
	},
	color: {
		"default": {
			bg: "var(--_1u1be655)",
			fg: "var(--_1u1be656)",
			border: "var(--_1u1be657)"
		},
		primary: {
			bg: "var(--_1u1be658)",
			fg: "var(--_1u1be659)",
			border: "var(--_1u1be65a)"
		},
		positive: {
			bg: "var(--_1u1be65b)",
			fg: "var(--_1u1be65c)",
			border: "var(--_1u1be65d)"
		},
		caution: {
			bg: "var(--_1u1be65e)",
			fg: "var(--_1u1be65f)",
			border: "var(--_1u1be65g)"
		},
		critical: {
			bg: "var(--_1u1be65h)",
			fg: "var(--_1u1be65i)",
			border: "var(--_1u1be65j)"
		}
	}
};
var lightTheme = "_1u1be65k";
var darkTheme = "_1u1be65l";
//#endregion
export { Button, VERSION, accent, button, darkTheme, lightTheme, loadingBox, spinner, vars };
