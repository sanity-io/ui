import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createRuntimeFn } from "@vanilla-extract/recipes/createRuntimeFn";
import { jsx, jsxs } from "react/jsx-runtime";
//#region lib-v1/src/button.css.ts
var accent = "var(--_3ryb2hw0)";
var loadingBox = "c1b40sxv8";
var spinner = "cfpnjfnl9";
var button = createRuntimeFn({
	defaultClassName: "c1dv0nn89",
	variantClassNames: {
		tone: {
			"default": "c3ymk3y3d",
			primary: "c37hjuqtw",
			positive: "c3qy82gme",
			caution: "c34m7tw75",
			critical: "c385waufe"
		},
		mode: {
			"default": "c15s2cyjr",
			ghost: "c1z9mt8px",
			bleed: "c1u5otdik"
		}
	},
	defaultVariants: {
		tone: "default",
		mode: "default"
	},
	compoundVariants: [[{
		tone: "default",
		mode: "ghost"
	}, "c1k7o07cb"], [{
		tone: "default",
		mode: "bleed"
	}, "c1k7o07cb"]]
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
			className: "c1b40sxv8",
			children: /* @__PURE__ */ jsx("span", { className: "cfpnjfnl9" })
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
var lightTheme = "c1fb9xsmv";
var darkTheme = "c1e4dhtsa";
//#endregion
export { Button, VERSION, accent, button, darkTheme, lightTheme, loadingBox, spinner, vars };
