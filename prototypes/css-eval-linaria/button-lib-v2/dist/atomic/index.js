import { cx, styled } from "@linaria/atomic";
import { jsx } from "react/jsx-runtime";
//#region src/Button.tsx
/**
* Dynamic style: the `$minWidth` prop becomes a CSS custom property that the
* `@linaria/react` runtime writes to the element's inline `style`.
*/
const _exp6 = () => ((props) => props.$minWidth);
const Root = /*#__PURE__*/ styled("button")({
	name: "Root",
	class: "atm_1s_glywfm atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_cx_1yuf4b4 atm_73_usvi9m atm_gi_idpfg4 atm_l8_i1cxyn atm_3f_idpfg4 atm_5j_5bgf0f atm_bv_1kw7nm4 atm_c8_1opsl3f atm_cs_ni7l0g atm_g3_cjiytx atm_rd_glywfm atm_vv_1q9ccgz atm_vb_glywfm atm_9j_tlke0l atm_jb_9uo3p8 atm_2d_1wzbhgk atm_7l_qaiy0 atm_70_k5rl5c atm_130qdna_ksd5f atm_17yrrpa_15flalp atm_6zeuib_yh40bf atm_17k35b2_1m5yvhi atm_q40q5s_73adwj r7yn0dk",
	propsAsIs: false,
	vars: { "1jv705i": [_exp6(), "px"] },
	atomic: true
});
/**
* Variants are plain `css` classes keyed by the variant union, so an unknown
* tone or mode is a type error at the call site and a missing entry here is a
* type error in the map itself.
*/
const toneClass = {
	default: "atm_1wmvf0a_bd32pd atm_188gxvv_1mpp3er atm_62pjcz_1l40ji4 atm_1njgjup_1t76mq0 atm_1teyyd3_jucadc",
	brand: "atm_1wmvf0a_4n5bcx atm_188gxvv_1ezx9z3 atm_62pjcz_1g3cfqn atm_1njgjup_z1wxkn atm_1teyyd3_1oc97o5",
	primary: "atm_1wmvf0a_1va1c0o atm_188gxvv_1622u2b atm_62pjcz_574cu2 atm_1njgjup_bz22gb atm_1teyyd3_11bj8pa",
	positive: "atm_1wmvf0a_gz0zqb atm_188gxvv_44ugel atm_62pjcz_qczprf atm_1njgjup_11yz0kq atm_1teyyd3_svphgn",
	caution: "atm_1wmvf0a_219mz3 atm_188gxvv_18xnhig atm_62pjcz_owqmu0 atm_1njgjup_1aca1w atm_1teyyd3_kg40c0",
	critical: "atm_1wmvf0a_xhcooy atm_188gxvv_16s4t5g atm_62pjcz_ads6n2 atm_1njgjup_1qusff5 atm_1teyyd3_jq4ii"
};
const modeClass = {
	default: "atm_18p79ab_73adwj",
	ghost: "atm_1wmvf0a_1j28jx2 atm_188gxvv_bd32pd atm_62pjcz_dbfbyw atm_1njgjup_1phy5fi",
	bleed: "atm_1wmvf0a_1j28jx2 atm_188gxvv_bd32pd atm_62pjcz_dbfbyw atm_1njgjup_1j28jx2"
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
		children: /* @__PURE__ */ jsx("span", { children })
	});
}
//#endregion
//#region src/theme.ts
/**
* Token contract: every design token is a CSS custom property. The object is
* the single source of truth for token *names*; themes assign *values*.
*/
const tokens = {
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
		brand: {
			bg: "--sui-tone-brand-bg",
			bgHover: "--sui-tone-brand-bg-hover",
			fg: "--sui-tone-brand-fg",
			border: "--sui-tone-brand-border",
			text: "--sui-tone-brand-text"
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
const lightTheme = {
	"--sui-color-bg": "#ffffff",
	"--sui-color-fg": "#1f2430",
	"--sui-color-border": "#d3d8e0",
	"--sui-color-focus-ring": "#3b82f6",
	"--sui-tone-default-bg": "#f0f2f5",
	"--sui-tone-default-bg-hover": "#e2e6ec",
	"--sui-tone-default-fg": "#1f2430",
	"--sui-tone-default-border": "#c5ccd6",
	"--sui-tone-default-text": "#1f2430",
	"--sui-tone-brand-bg": "#f03e2f",
	"--sui-tone-brand-bg-hover": "#d12e20",
	"--sui-tone-brand-fg": "#ffffff",
	"--sui-tone-brand-border": "#d12e20",
	"--sui-tone-brand-text": "#b4261a",
	"--sui-tone-primary-bg": "#7c3aed",
	"--sui-tone-primary-bg-hover": "#6d28d9",
	"--sui-tone-primary-fg": "#ffffff",
	"--sui-tone-primary-border": "#6d28d9",
	"--sui-tone-primary-text": "#6d28d9",
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
	"--sui-radius-2": "999px",
	"--sui-space-2": "8px",
	"--sui-space-3": "12px",
	"--sui-font-size-1": "13px",
	"--sui-font-family": "Inter, system-ui, sans-serif"
};
const darkTheme = {
	...lightTheme,
	"--sui-color-bg": "#13141b",
	"--sui-color-fg": "#e6e8ee",
	"--sui-color-border": "#2f3340",
	"--sui-tone-default-bg": "#262a36",
	"--sui-tone-default-bg-hover": "#333848",
	"--sui-tone-default-fg": "#e6e8ee",
	"--sui-tone-default-border": "#3a4050",
	"--sui-tone-default-text": "#e6e8ee",
	"--sui-tone-brand-text": "#ff8a7e",
	"--sui-tone-primary-text": "#c4b5fd",
	"--sui-tone-positive-text": "#6fd394",
	"--sui-tone-caution-text": "#f5d45a",
	"--sui-tone-critical-text": "#ff8a7e"
};
/**
* Theme scopes are plain classes that set the token variables. `declarations`
* runs at build time inside the wyw-in-js evaluator, so the CSS output holds
* literal `--sui-*: value;` lines and nothing is left for the browser to do.
*/
const themeLight = "atm_o8i6yz_1pec9uq atm_tj12oc_os8ix2 atm_5agha1_5by5iu atm_1q6x3gv_es4d0m atm_dp9r1k_b1be4n atm_1k3zc8r_1b3x7jl atm_15f5edf_os8ix2 atm_1ouo74d_2upek atm_1wpuqav_os8ix2 atm_4k6sr7_wcr1gr atm_cnr8zp_1x7z1ig atm_101cvcs_1pec9uq atm_1btx275_1x7z1ig atm_1ibmul9_qppl8f atm_1r08it8_urgfxr atm_34dha5_znj607 atm_t9s1yb_1pec9uq atm_sj866u_znj607 atm_l3rmbp_znj607 atm_5uqqlu_1lssl7y atm_1kkks4v_1ir0neg atm_16wed7f_1pec9uq atm_44m239_1ir0neg atm_10ba14e_47sr2c atm_1anegey_16coy59 atm_18jeqtr_752b00 atm_1r1evu4_1ewqnty atm_mvex4e_752b00 atm_qvcssj_1drlbpe atm_1gwvmot_wcr1gr atm_12pw3fe_1x7z1ig atm_8pwm39_1pec9uq atm_6bt9wy_1x7z1ig atm_1bg4iar_qppl8f atm_s571b8_1l7b3ar atm_gmvfr6_w7q6bv atm_1crl6kq_ftgil2 atm_noii8s_1fwxnve atm_1hwkdv0_w1gvyb atm_h27e2z_qwvcsu atm_26_b623dp atm_7l_1r9pkfx atm_bx_sgw7lz";
const themeDark = "atm_o8i6yz_17bt2mk atm_tj12oc_ku7hv3 atm_5agha1_1dqs4ms atm_1q6x3gv_es4d0m atm_dp9r1k_mwbmn8 atm_1k3zc8r_epwclm atm_15f5edf_ku7hv3 atm_1ouo74d_1hxvbuj atm_1wpuqav_ku7hv3 atm_4k6sr7_wcr1gr atm_cnr8zp_1x7z1ig atm_101cvcs_1pec9uq atm_1btx275_1x7z1ig atm_1ibmul9_18h04c2 atm_1r08it8_urgfxr atm_34dha5_znj607 atm_t9s1yb_1pec9uq atm_sj866u_znj607 atm_l3rmbp_1mgjhzw atm_5uqqlu_1lssl7y atm_1kkks4v_1ir0neg atm_16wed7f_1pec9uq atm_44m239_1ir0neg atm_10ba14e_1nczur0 atm_1anegey_16coy59 atm_18jeqtr_752b00 atm_1r1evu4_1ewqnty atm_mvex4e_752b00 atm_qvcssj_194njp2 atm_1gwvmot_wcr1gr atm_12pw3fe_1x7z1ig atm_8pwm39_1pec9uq atm_6bt9wy_1x7z1ig atm_1bg4iar_18h04c2 atm_s571b8_1l7b3ar atm_gmvfr6_w7q6bv atm_1crl6kq_ftgil2 atm_noii8s_1fwxnve atm_1hwkdv0_w1gvyb atm_h27e2z_qwvcsu atm_26_b623dp atm_7l_1r9pkfx atm_bx_sgw7lz";
//#endregion
export { Button, darkTheme, lightTheme, themeDark, themeLight, tokens, v };
