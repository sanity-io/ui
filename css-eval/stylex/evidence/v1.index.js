import * as stylex from "@stylexjs/stylex";
import { jsx, jsxs } from "react/jsx-runtime";
/**
* A theme is a class name (content hash of its overrides) that re-assigns the
* token variables for a subtree: `<div {...stylex.props(darkTheme)}>`.
* Overrides are type-checked against the token group — unknown keys fail `tsc`.
*/
const darkTheme = {
	x1g1e887: "x19bo577 x1g1e887",
	$$css: !0
}, tones = {
	default: {
		xmfpx0s: "x2utbif xmfpx0s",
		$$css: !0
	},
	primary: {
		xmfpx0s: "xw2wob7 xmfpx0s",
		$$css: !0
	},
	positive: {
		xmfpx0s: "xow110h xmfpx0s",
		$$css: !0
	},
	caution: {
		xmfpx0s: "xojz9ag xmfpx0s",
		$$css: !0
	},
	critical: {
		xmfpx0s: "xltwagc xmfpx0s",
		$$css: !0
	}
}, styles = {
	root: {
		kysU6D: "xjyslct",
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kVAEAm: "x1n2onr6",
		kXLuUW: "x16dsc37",
		kB7OPa: "x9f619",
		kogj98: "x1ghz6dp",
		kmVPX3: "x1717udv",
		ksu8eU: "xng3xce",
		k3XXqK: "x1t137rt",
		kfSwDN: "x87ps6o",
		kybGjl: "x1hl2dhg",
		khDVqt: "xuxw1ft",
		k9WMMc: "xdpxx8g",
		kkrTdU: "x1ypdohk xtgyt42",
		kMv6JI: "xxv95j5",
		kGuDYH: "xzj3xqn",
		kLWn49: "xhps8mw",
		k63SB2: "x1ko3t5s",
		$$css: !0
	},
	fill: {
		kzqmXN: "x1hz3ggw",
		$$css: !0
	},
	width: (width) => [{
		kzqmXN: width == null ? width : "x5lhr3w",
		$$css: !0
	}, { "--x-width": ((val) => typeof val == "number" ? val + "px" : val ?? void 0)(width) }]
}, paddingStyles = {
	0: {
		kmVPX3: "x1717udv",
		$$css: !0
	},
	1: {
		kmVPX3: "x118qlua",
		$$css: !0
	},
	2: {
		kmVPX3: "xaxm6r5",
		$$css: !0
	},
	3: {
		kmVPX3: "xzza1ct",
		$$css: !0
	},
	4: {
		kmVPX3: "x1ym872c",
		$$css: !0
	}
}, radiusStyles = {
	0: {
		kaIpWk: "x2u8bby",
		$$css: !0
	},
	1: {
		kaIpWk: "x1olkf8y",
		$$css: !0
	},
	2: {
		kaIpWk: "xqq08g0",
		$$css: !0
	},
	3: {
		kaIpWk: "x1f01s7s",
		$$css: !0
	}
}, modeStyles = {
	default: {
		kWkggS: "xmhrcog x130la7q x1w2etyo",
		kMwMTN: "xd3w7jj",
		kGVxlE: "x1fk98uv x7jd81h",
		$$css: !0
	},
	ghost: {
		kWkggS: "xjbqb8w x1e0oyos xpfrpo8",
		kMwMTN: "xngkdm4",
		kGVxlE: "x1fk98uv x7jd81h",
		$$css: !0
	},
	bleed: {
		kWkggS: "xjbqb8w x1e0oyos xpfrpo8",
		kMwMTN: "xngkdm4",
		kGVxlE: "x1gnnqk1 xm81fiv",
		$$css: !0
	}
}, selectedStyles = {
	default: {
		kWkggS: "xmrfbj3",
		$$css: !0
	},
	ghost: {
		kWkggS: "x1k4vkkg",
		$$css: !0
	},
	bleed: {
		kWkggS: "x1k4vkkg",
		$$css: !0
	}
}, disabledStyles = {
	default: {
		kWkggS: "x1unqq7c",
		kMwMTN: "x1rpvv64",
		kGVxlE: "x1n5m0lp",
		$$css: !0
	},
	ghost: {
		kWkggS: "xjbqb8w",
		kMwMTN: "x1rpvv64",
		kGVxlE: "x1n5m0lp",
		$$css: !0
	},
	bleed: {
		kWkggS: "xjbqb8w",
		kMwMTN: "x1rpvv64",
		kGVxlE: "x1gnnqk1",
		$$css: !0
	}
};
function Button(props) {
	let { children, className, disabled = !1, mode = "default", padding = 3, radius = 2, selected = !1, style, text, tone = "default", type = "button", width, xstyle, ...rest } = props, sx = stylex.props(styles.root, paddingStyles[padding], radiusStyles[radius], tones[tone], disabled ? disabledStyles[mode] : modeStyles[mode], !disabled && selected && selectedStyles[mode], width === "fill" && styles.fill, typeof width == "number" && styles.width(width), xstyle);
	return /* @__PURE__ */ jsx("button", {
		...rest,
		className: className ? `${sx.className} ${className}` : sx.className,
		"data-ui": "Button",
		disabled,
		style: style ? {
			...sx.style,
			...style
		} : sx.style,
		type,
		children: (text !== void 0 || children !== void 0) && /* @__PURE__ */ jsxs("span", {
			className: "x1lliihq x1iyjqo2 xs83m0k x1t1x2f9 xeuugli x1pjcqnp",
			children: [text !== void 0 && /* @__PURE__ */ jsx("span", {
				className: "x1lliihq xb3r6kr xlyipyv",
				children: text
			}), children]
		})
	});
}
const VERSION = "1.0.0";
export { Button, VERSION, darkTheme, tones };
