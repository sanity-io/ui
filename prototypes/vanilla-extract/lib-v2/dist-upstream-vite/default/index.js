import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v2/src/button.css.ts
var accent = "var(--lgqk170)";
var button = createRuntimeFn({
	defaultClassName: "lgqk174",
	variantClassNames: {
		tone: {
			"default": "lgqk175",
			primary: "lgqk176",
			positive: "lgqk177",
			caution: "lgqk178",
			critical: "lgqk179"
		},
		mode: {
			"default": "lgqk17a",
			ghost: "lgqk17b",
			bleed: "lgqk17c"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "lgqk17d"], [{
		tone: "default",
		mode: "bleed"
	}, "lgqk17e"]]
});
var iconBox = "lgqk17f";
var loadingBox = "lgqk17g";
var spinner = "lgqk17i";
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
				className: "lgqk17f",
				children: icon
			}),
			/* @__PURE__ */ jsx("span", { children }),
			loading && /* @__PURE__ */ jsx("span", {
				"data-ui": "Button-loading",
				className: "lgqk17g",
				children: /* @__PURE__ */ jsx("span", { className: "lgqk17i" })
			})
		]
	});
}
//#endregion
//#region lib-v2/src/theme.css.ts
var vars = {
	radius: { control: "var(--_1u1be650)" },
	space: {
		inline: "var(--_1u1be651)",
		block: "var(--_1u1be652)",
		gap: "var(--_1u1be653)"
	},
	font: {
		size: "var(--_1u1be654)",
		weight: "var(--_1u1be655)"
	},
	color: {
		"default": {
			bg: "var(--_1u1be656)",
			fg: "var(--_1u1be657)",
			border: "var(--_1u1be658)"
		},
		primary: {
			bg: "var(--_1u1be659)",
			fg: "var(--_1u1be65a)",
			border: "var(--_1u1be65b)"
		},
		positive: {
			bg: "var(--_1u1be65c)",
			fg: "var(--_1u1be65d)",
			border: "var(--_1u1be65e)"
		},
		caution: {
			bg: "var(--_1u1be65f)",
			fg: "var(--_1u1be65g)",
			border: "var(--_1u1be65h)"
		},
		critical: {
			bg: "var(--_1u1be65i)",
			fg: "var(--_1u1be65j)",
			border: "var(--_1u1be65k)"
		}
	}
};
var lightTheme = "_1u1be65l";
var darkTheme = "_1u1be65m";
//#endregion
export { Button, VERSION, accent, button, darkTheme, iconBox, lightTheme, loadingBox, spinner, vars };
