import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v1/src/button.css.ts
var accent = "var(--_3ryb2hw0)";
var loadingBox = "_3ryb2hw4";
var spinner = "_3ryb2hw6";
var button = createRuntimeFn({
	defaultClassName: "_3ryb2hw7",
	variantClassNames: {
		tone: {
			"default": "_3ryb2hw8",
			primary: "_3ryb2hw9",
			positive: "_3ryb2hwa",
			caution: "_3ryb2hwb",
			critical: "_3ryb2hwc"
		},
		mode: {
			"default": "_3ryb2hwd",
			ghost: "_3ryb2hwe",
			bleed: "_3ryb2hwf"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "_3ryb2hwg"], [{
		tone: "default",
		mode: "bleed"
	}, "_3ryb2hwh"]]
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
			className: "_3ryb2hw4",
			children: /* @__PURE__ */ jsx("span", { className: "_3ryb2hw6" })
		})]
	});
}
//#endregion
//#region lib-v1/src/theme.css.ts
var vars = {
	radius: { control: "var(--_278e1up0)" },
	space: {
		inline: "var(--_278e1up1)",
		block: "var(--_278e1up2)"
	},
	font: {
		size: "var(--_278e1up3)",
		weight: "var(--_278e1up4)"
	},
	color: {
		"default": {
			bg: "var(--_278e1up5)",
			fg: "var(--_278e1up6)",
			border: "var(--_278e1up7)"
		},
		primary: {
			bg: "var(--_278e1up8)",
			fg: "var(--_278e1up9)",
			border: "var(--_278e1upa)"
		},
		positive: {
			bg: "var(--_278e1upb)",
			fg: "var(--_278e1upc)",
			border: "var(--_278e1upd)"
		},
		caution: {
			bg: "var(--_278e1upe)",
			fg: "var(--_278e1upf)",
			border: "var(--_278e1upg)"
		},
		critical: {
			bg: "var(--_278e1uph)",
			fg: "var(--_278e1upi)",
			border: "var(--_278e1upj)"
		}
	}
};
var lightTheme = "_278e1upk";
var darkTheme = "_278e1upl";
//#endregion
export { Button, VERSION, accent, button, darkTheme, lightTheme, loadingBox, spinner, vars };
