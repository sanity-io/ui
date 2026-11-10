# 🟢 AI Literacy Score Report

**Overall: 81/100** · Doc Lift: +28 · Actual: 51/100 · Ret. Gap: 30 · 516 tests · 0 errored · Cost: $65.75

| Field     | Value                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| Report ID | [`01a19dba-25bc-7651-bede-79282a2be475`](https://admin.sanity.io/ailf/report/01a19dba-25bc-7651-bede-79282a2be475) |
| Completed | Nov 2, 2026, 7:26 PM UTC                                                                                           |
| Duration  | 21m 7s                                                                                                             |
| Mode      | full                                                                                                               |

<details>
<summary>🔧 Environment</summary>

| Setting  | Value                      |
| -------- | -------------------------- |
| Source   | production                 |
| Docs URL | https://www.sanity.io/docs |
| Dataset  | next                       |
| Project  | 3do82whm                   |

</details>

<details>
<summary>🔍 Source verification</summary>

| Setting | Value                      |
| ------- | -------------------------- |
| Source  | https://www.sanity.io/docs |
| Mode    | full                       |
| Search  | open                       |

</details>

### Scores by Feature Area

| Feature      | Score  | Grade | Task | Code | Docs | Doc Lift | Tests |
| ------------ | ------ | ----- | ---- | ---- | ---- | -------- | ----- |
| sanity-ui-v5 | **81** | ✅ A  | 79   | 86   | 0    | 📈 +28   | 258   |

### 🔬 Three-Layer Decomposition

| Feature      | Floor | Ceiling | Actual | Doc Lift | Retr. Gap | Infra % |
| ------------ | ----- | ------- | ------ | -------- | --------- | ------- |
| sanity-ui-v5 | 53    | 81      | 51     | 📈 +28   | +30       | 63%     |

<details>
<summary>📖 What do these numbers mean?</summary>

- **Floor:** Model performance without any documentation (training data only)
- **Ceiling:** Model performance with perfect documentation (hand-picked, injected)
- **Actual:** Model performance when finding docs on its own (like real users)
- **Doc Lift:** Documentation quality contribution (Ceiling − Floor)
- **Retr. Gap:** Quality lost in discovery (Ceiling − Actual)
- **Infra %:** Fraction of doc quality reaching agents (Actual ÷ Ceiling)

</details>

<details>
<summary>🤖 Per-model scores</summary>

| Model           | Score  | Doc Lift | Tests | Cost  |
| --------------- | ------ | -------- | ----- | ----- |
| Claude Opus 5.5 | **84** | +33      | 86    | $7.39 |
| GPT 6 Sol       | **81** | +25      | 86    | $0.69 |
| GPT 6.1 Terra   | **80** | +28      | 86    | $1.01 |

**Claude Opus 5.5** (`anthropic:messages:claude-opus-5-5`):

| Feature      | Score  | Task | Code | Docs | Lift |
| ------------ | ------ | ---- | ---- | ---- | ---- |
| sanity-ui-v5 | **84** | 82   | 87   | 0    | +33  |

**GPT 6 Sol** (`openai:chat:gpt-6-sol`):

| Feature      | Score  | Task | Code | Docs | Lift |
| ------------ | ------ | ---- | ---- | ---- | ---- |
| sanity-ui-v5 | **81** | 78   | 86   | 0    | +25  |

**GPT 6.1 Terra** (`openai:responses:gpt-6.1-terra`):

| Feature      | Score  | Task | Code | Docs | Lift |
| ------------ | ------ | ---- | ---- | ---- | ---- |
| sanity-ui-v5 | **80** | 78   | 84   | 0    | +28  |

</details>

### 📊 Score Comparison

**Overall delta: +2** (➡️, threshold ±2)

| Feature      | Baseline | Current | Delta | Actual Δ | Ret. Gap Δ | Infra Δ |
| ------------ | -------- | ------- | ----- | -------- | ---------- | ------- |
| sanity-ui-v5 | 79       | 81      | ➡️ +2 | +13      | -11        | +15pp   |

➡️ 1 unchanged (threshold: ±2)

<details>
<summary>Dimension averages</summary>

| Dimension       | Delta |
| --------------- | ----- |
| CodeCorrectness | -1    |
| TaskCompletion  | +5    |
| Doc Lift        | -3    |

</details>

<details>
<summary>💰 Eval cost breakdown</summary>

| Category                                      | Cost       |
| --------------------------------------------- | ---------- |
| Provider (model inference)                    | $43.79     |
| Grader (anthropic:messages:claude-sonnet-5-5) | $21.96     |
| **Total**                                     | **$65.75** |

**Provider cost by feature area:**

| Feature      | Tests | Cost   | Avg/Test |
| ------------ | ----- | ------ | -------- |
| sanity-ui-v5 | 258   | $43.79 | $0.17    |

</details>

<details>
<summary>🔍 Low-Scoring Judgments (50 below 70)</summary>

#### Badge — leading icon is iconStart, label is text, and tone uses the v5 vocabulary (baseline) (1)

**🔴 5** · Code Correctness · Badge — leading icon is iconStart, label is text, and tone uses the v5 vocabulary (baseline) · `openai:responses:gpt-6.1-terra`

> Fails nearly every rubric check. Icons are rendered as children instead of via `iconStart`, labels are children rather than the `text` prop, and the second badge uses the disallowed `tone="default"`. Icons are imported from the '@sanity/icons' root rather than per-icon subpaths.

#### Box — use styling props instead inline styles to adjust appearance (baseline) (1)

**🔴 5** · Code Correctness · Box — use styling props instead inline styles to adjust appearance (baseline) · `anthropic:messages:claude-opus-5-5`

> The response imports and uses Card (not Box) and wraps it with styled(Card), directly violating the 'No Flex or Card' check. It never uses Box in code, contradicts the reference that Box has border*, width/height/minWidth props and tone, and resorts to styled-components for min-w

#### Button — tone='primary' was removed; use level='primary' (baseline) (2)

**🔴 5** · Task Completion · Button — tone='primary' was removed; use level='primary' (baseline) · `openai:responses:gpt-6.1-terra`

> The response never uses `level="primary"`, which the reference documents as the way to set emphasis. It invents or relies on a `mode` prop that is absent from the reference's prop list, and sets `tone="positive"` rather than removing tone or using `neutral`. It also suggests `ton

**🔴 5** · Code Correctness · Button — tone='primary' was removed; use level='primary' (baseline) · `anthropic:messages:claude-opus-5-5`

> The reference says tone='primary' was removed and the fix is level='primary'. The response never mentions `level`; it instead steers users to the removed `mode` prop and to `tone="default"`, both of which the rubric explicitly flags. It also uses `icon` rather than the documented

#### Button — tone='primary' was removed; use level='primary' (gold) (2)

**🔴 0** · Code Correctness · Button — tone='primary' was removed; use level='primary' (gold) · `agentic:optimized:gpt-6-sol`

> The response provides no usable JSX. It is confused and self-contradictory, hinting at `tone="default"` with `mode="default"`, both of which the rubric flags as wrong/removed. It never shows `level="primary"`, never uses the `text` prop, and never imports Button from `@sanity/ui`

**🔴 0** · Task Completion · Button — tone='primary' was removed; use level='primary' (gold) · `agentic:naive:gpt-6-sol`

> The response keeps `tone="primary"`, which the reference says was removed, and never uses `level="primary"`. It introduces a `mode` prop absent from the documented props. It also cites docs claiming `primary` is a valid tone, contradicting the reference. It fails every rubric req

#### Button — use the loading prop for a pending action; it disables the button and the label stays unchanged (gold) (4)

**🔴 0** · Task Completion · Button — use the loading prop for a pending action; it disables the button and the label stays unchanged (gold) · `agentic:optimized:gpt-6-sol`

> The candidate declined to attempt the task, claiming it couldn't verify a `loading` prop. The reference explicitly documents `loading` (boolean) on Button, which disables the button and leaves the label unchanged. The response provides no corrected JSX, doesn't replace the Spinne

**🔴 0** · Code Correctness · Button — use the loading prop for a pending action; it disables the button and the label stays unchanged (gold) · `agentic:optimized:gpt-6-sol`

> The candidate provides no code, so none of the rubric's checks can be satisfied. It never shows a Button with `loading` bound to pending state, a constant `text`, `type="submit"`, `level="primary"`, or an import from '@sanity/ui'. The reference documents `loading` as a Button pro

**🔴 0** · Task Completion · Button — use the loading prop for a pending action; it disables the button and the label stays unchanged (gold) · `agentic:naive:gpt-6-sol`

> The candidate declined to answer. It provided no corrected Button JSX, did not use the `loading` prop, and did not remove `disabled={isSaving}`. It wrongly claimed the docs did not cover the loading pattern, though the reference documents Button's `loading` prop. No rubric criter

**🔴 0** · Code Correctness · Button — use the loading prop for a pending action; it disables the button and the label stays unchanged (gold) · `agentic:naive:gpt-6-sol`

> The candidate provided no code at all. It declined to answer, claiming docs didn't document the loading pattern, though the reference confirms Button has a `loading` boolean prop. No Button with `loading`, constant `text`, `type="submit"`, `level="primary"`, or import from '@sani

#### Card — v3 props (padding, radius, shadow) are no longer supported (baseline) (3)

**🔴 0** · Task Completion · Card — v3 props (padding, radius, shadow) are no longer supported (baseline) · `openai:chat:gpt-6-sol`

> The response keeps `padding={4}` and `radius={2}` and asserts they are valid props. The reference says v3 no longer supports them. It never uses `density` or `tone`, so it gives no corrected example and misses the migration the task requires.

**🔴 5** · Code Correctness · Card — v3 props (padding, radius, shadow) are no longer supported (baseline) · `openai:chat:gpt-6-sol`

> The candidate passes `padding={4}` and `radius={2}` directly to Card, which the reference says are no longer supported in v3. It also claims they are valid props, contradicting the docs, and ignores v5 `density`, `tone`, and margin props. Import and JSX syntax are fine, but the c

**🔴 5** · Task Completion · Card — v3 props (padding, radius, shadow) are no longer supported (baseline) · `anthropic:messages:claude-opus-5-5`

> The reference states padding, radius, and shadow are no longer supported in Card v3, replaced by `density` and `tone`. The response directly contradicts this, asserting Card still accepts padding and radius and keeping `padding={4} radius={2} shadow={1}` in its 'corrected' exampl

#### Card — v3 props (padding, radius, shadow) are no longer supported (gold) (1)

**🔴 0** · Task Completion · Card — v3 props (padding, radius, shadow) are no longer supported (gold) · `agentic:optimized:claude-opus-5-5`

> The reference states Card v3 props padding, radius, and shadow are no longer supported and should be replaced with density (plus tone, margin props). The response asserts the opposite: that padding/radius were not removed, and its 'corrected' example still uses padding={4}, radiu

#### Comments — oldest-first nested list, resolve without confirmation, delete with a critical confirm (gold) (1)

**🔴 0** · Code Correctness · Comments — oldest-first nested list, resolve without confirmation, delete with a critical confirm (gold) · `openai:responses:gpt-6.1-terra`

> The candidate produced no code. It declined to implement the thread UI, resolve action, or delete confirmation dialog, so none of the code-correctness checks (reply ordering in nested list, direct resolve handler, critical-tone Dialog confirmation, Sanity UI 5 imports) can be sat

#### Dialog — porting a v3 Dialog: keep it mounted with open, use size and Dialog.Footer, and drop hand-rolled dismissal (baseline) (2)

**🔴 5** · Task Completion · Dialog — porting a v3 Dialog: keep it mounted with open, use size and Dialog.Footer, and drop hand-rolled dismissal (baseline) · `anthropic:messages:claude-opus-5-5`

> Response follows the older v3 API. It conditionally renders the Dialog (`{open && ...}`) and explicitly claims 'Dialog has no open prop', contradicting the reference. It keeps `width={1}` instead of `size`, uses a `footer` prop instead of `Dialog.Footer`, wraps content in Box ins

**🔴 5** · Task Completion · Dialog — porting a v3 Dialog: keep it mounted with open, use size and Dialog.Footer, and drop hand-rolled dismissal (baseline) · `openai:responses:gpt-6.1-terra`

> The response fails all four required behaviors. It conditionally renders the Dialog with `{open && ...}` instead of keeping it mounted and passing `open`. It uses the v3-style `footer` prop and a plain Box child instead of `Dialog.Footer` and `Dialog.Content`. It keeps `width={1}

#### Eyebrow — pass sentence-case text; the component applies the uppercase treatment itself (baseline) (4)

**🔴 5** · Task Completion · Eyebrow — pass sentence-case text; the component applies the uppercase treatment itself (baseline) · `openai:chat:gpt-6-sol`

> The reference documents an `Eyebrow` component with props like `size`, `tone`, `muted`, `weight`, and applies uppercase itself. The response falsely claims `Eyebrow` doesn't exist, uses `Text` instead, hardcodes uppercase text, and still includes an inline letterSpacing style ove

**🔴 5** · Code Correctness · Eyebrow — pass sentence-case text; the component applies the uppercase treatment itself (baseline) · `openai:chat:gpt-6-sol`

> The response fails every rubric check. It never imports or uses Eyebrow, and it wrongly asserts that @sanity/ui has no Eyebrow component, contradicting the reference. It imports Stack instead of VStack. It sets a letterSpacing style, and the label is all caps ('CASE STUDY') inste

**🔴 5** · Task Completion · Eyebrow — pass sentence-case text; the component applies the uppercase treatment itself (baseline) · `openai:responses:gpt-6.1-terra`

> The response rejects the documented Eyebrow/VStack components and substitutes @sanity/ui's Text/Stack. It keeps the inline textTransform and letterSpacing style override, which is the exact thing the task requires removing; it should use Eyebrow with sentence-case text, since the

**🔴 5** · Task Completion · Eyebrow — pass sentence-case text; the component applies the uppercase treatment itself (baseline) · `anthropic:messages:claude-opus-5-5`

> The reference states Eyebrow is a documented component that applies the uppercase treatment itself, so inline textTransform/letterSpacing should be removed and the Eyebrow kept above the Heading in a VStack. The response does the opposite: it declares Eyebrow and VStack don't exi

#### Flex — v3 shorthand props are renamed to full CSS names (baseline) (3)

**🔴 5** · Code Correctness · Flex — v3 shorthand props are renamed to full CSS names (baseline) · `openai:chat:gpt-6-sol`

> The candidate uses the v3 shorthand props `align` and `justify` on Flex, which the reference says are renamed to full CSS names (`alignItems`, `justifyContent`). The rubric explicitly checks against these shorthands. JSX is syntactically valid, but the core requirement is violate

**🔴 5** · Code Correctness · Flex — v3 shorthand props are renamed to full CSS names (baseline) · `anthropic:messages:claude-opus-5-5`

> The response uses the deprecated v3 shorthands `direction`, `align`, and `justify` on Flex instead of the full CSS names `flexDirection`, `alignItems`, `justifyContent`. The reference states these were renamed in v3. It also tells the reader the shorthands are the supported API a

**🔴 5** · Code Correctness · Flex — v3 shorthand props are renamed to full CSS names (baseline) · `openai:responses:gpt-6.1-terra`

> The candidate uses the v3 shorthand props `direction`, `align`, and `justify` on Flex, which the reference shows have been renamed to `flexDirection`, `alignItems`, and `justifyContent`. The rubric explicitly checks against these shorthands, so the code fails the core criteria de

#### Getting started — the missing polyfills import silently breaks Tooltip and Dialog (baseline) (1)

**🔴 5** · Task Completion · Getting started — the missing polyfills import silently breaks Tooltip and Dialog (baseline) · `openai:responses:gpt-6.1-terra`

> The response never adds `import '@sanity/ui/polyfills'` to the entry file, which is the single fix the rubric requires. It also misdiagnoses the problem, saying the cause can't be determined from the entry file and instead rewriting Tooltip/Dialog components with per-component ch

#### Getting started — the missing polyfills import silently breaks Tooltip and Dialog (gold) (3)

**🔴 0** · Task Completion · Getting started — the missing polyfills import silently breaks Tooltip and Dialog (gold) · `openai:responses:gpt-6.1-terra`

> The candidate declined to attempt the task, claiming the documentation was insufficient. It did not add `import '@sanity/ui/polyfills'` to the entry file, did not fix either bug, and showed no corrected entry file. All rubric requirements are unmet.

**🔴 0** · Code Correctness · Getting started — the missing polyfills import silently breaks Tooltip and Dialog (gold) · `openai:responses:gpt-6.1-terra`

> The candidate provides no corrected code. It does not add the `@sanity/ui/polyfills` import at the entry point, does not demonstrate keeping the `@sanity/ui/styles.css` import (only mentions it's already present), and offers no fix for Tooltip/Dialog. It declines the task and req

**🔴 5** · Task Completion · Getting started — the missing polyfills import silently breaks Tooltip and Dialog (gold) · `openai:chat:gpt-6-sol`

> The candidate misdiagnoses the problem as a missing ThemeProvider and never mentions the `@sanity/ui/polyfills` import. It doesn't add that import above the stylesheet import, and its entry file is built around ThemeProvider/buildLegacyTheme, which isn't the fix. None of the requ

#### Grid — responsive v3 `columns` becomes a gridTemplateColumns array of CSS strings (gold) (2)

**🔴 0** · Task Completion · Grid — responsive v3 `columns` becomes a gridTemplateColumns array of CSS strings (gold) · `agentic:naive:gpt-6-sol`

> The response provides no code or migration. It declines to attempt the task, despite the reference documenting that `gridTemplateColumns` is a responsive Grid prop accepting strings. None of the rubric requirements (gridTemplateColumns replacement, breakpoint array, imports, gap

**🔴 0** · Code Correctness · Grid — responsive v3 `columns` becomes a gridTemplateColumns array of CSS strings (gold) · `agentic:naive:gpt-6-sol`

> The candidate provides no code and no migration. It declines to answer, never converting `columns={[1,1,2,3]}` to a `gridTemplateColumns` array of CSS strings like ["1fr","1fr","repeat(2, 1fr)","repeat(3, 1fr)"]. The task is not completed, so there is nothing to evaluate against

#### Icon — pass a glyph into the Icon component (baseline) (1)

**🔴 5** · Task Completion · Icon — pass a glyph into the Icon component (baseline) · `openai:responses:gpt-6.1-terra`

> The response claims `@sanity/ui` does not export an `Icon` component, directly contradicting the authoritative reference, which documents `Icon` with `icon` and `size` props. It never uses `Icon`, imports SearchIcon from '@sanity/icons' rather than the '@sanity/icons/Search' subp

#### Icon — use real @sanity/icons names, not invented ones (baseline) (1)

**🔴 3** · Code Correctness · Icon — use real @sanity/icons names, not invented ones (baseline) · `openai:chat:gpt-6-sol`

> The candidate fails nearly every check. It imports SendIcon and SettingsIcon, which are the invented glyph names the rubric warns about. It imports them from the @sanity/icons root instead of per-glyph subpaths such as '@sanity/icons/Cog'. It uses the v3 `icon` prop instead of `i

#### IndicatorStack — side-by-side Indicators need IndicatorStack for the cut-out mask, not a Flex or HStack (baseline) (1)

**🔴 5** · Code Correctness · IndicatorStack — side-by-side Indicators need IndicatorStack for the cut-out mask, not a Flex or HStack (baseline) · `anthropic:messages:claude-opus-5-5`

> The response rejects the intended solution. It claims Indicator is not a @sanity/ui export and builds a custom styled Dot inside Flex, never importing IndicatorStack or Indicator. The reference shows IndicatorStack exists as the documented container for Indicator dots. The two do

#### Installation — import v5 styles before your own CSS; only the reset is layered (gold) (1)

**🔴 5** · Task Completion · Installation — import v5 styles before your own CSS; only the reset is layered (gold) · `openai:chat:gpt-6-sol`

> The response gives the wrong order: polyfills, then ./index.css, then @sanity/ui/styles.css last. The rubric requires polyfills, then @sanity/ui/styles.css, then ./index.css, so the app's classes load after v5's component styles. It also misstates the layering mechanics (only the

#### Link — openInNewTab sets target/rel together, underlined is a boolean prop, not a style (baseline) (2)

**🔴 5** · Task Completion · Link — openInNewTab sets target/rel together, underlined is a boolean prop, not a style (baseline) · `openai:chat:gpt-6-sol`

> The response uses `target`, hand-written `rel`, and `textDecoration` from `@sanity/ui`, none of which match the documented API. The reference documents `openInNewTab` (sets target/rel together) and boolean `underlined`. The response hand-writes `rel` alongside `target`, never use

**🔴 5** · Code Correctness · Link — openInNewTab sets target/rel together, underlined is a boolean prop, not a style (baseline) · `anthropic:messages:claude-opus-5-5`

> The reference documents a `Link` component with `openInNewTab` and `underlined` boolean props. The response asserts `@sanity/ui` has no `Link` component (contradicting the reference), never imports Link, uses raw `target="_blank"` and `rel` attributes instead of `openInNewTab`, a

#### Migrating v3 to v5 — Button mode, Icon symbol and Tooltip content (gold) (2)

**🔴 0** · Task Completion · Migrating v3 to v5 — Button mode, Icon symbol and Tooltip content (gold) · `agentic:optimized:gpt-6-sol`

> The response declined to attempt the migration and produced no code. It did not replace Button `mode` with `level`, use the v5 `Icon` with the `icon` prop, import from the `@sanity/icons` subpath, keep Tooltip `content`, or rename Flex `align` to `alignItems`. The reference does

**🔴 0** · Code Correctness · Migrating v3 to v5 — Button mode, Icon symbol and Tooltip content (gold) · `agentic:optimized:gpt-6-sol`

> The candidate provides no code. It declines to produce a migrated snippet, so none of the checks can be satisfied: no imports from @sanity/ui, no migrated Button/Tooltip JSX, no evidence that `mode`/`symbol`/`align`/Tooltip `text` were removed, and no Tooltip wrapping a single Bu

#### Migrating v3 to v5 — Card padding, tone and Flex prop names (baseline) (2)

**🔴 0** · Task Completion · Migrating v3 to v5 — Card padding, tone and Flex prop names (baseline) · `openai:responses:gpt-6.1-terra`

> The candidate refused to attempt the migration and provided no code. It did not use density="compact" on Card, did not change tone from "default" to "neutral", and did not import any components from @sanity/ui. The reference documents the Card `density` and `tone` props, so the i

**🔴 0** · Code Correctness · Migrating v3 to v5 — Card padding, tone and Flex prop names (baseline) · `openai:responses:gpt-6.1-terra`

> The candidate provides no code at all. It declines to answer and asks for more information, so none of the required migration elements (Card density without padding/radius/gap, Flex with flexDirection/alignItems/justifyContent, no inline style or wrapper Box, valid JSX) are demon

#### Popover — uncontrolled: no open or onClose; the button trigger opens it and the browser closes it (gold) (1)

**🔴 0** · Code Correctness · Popover — uncontrolled: no open or onClose; the button trigger opens it and the browser closes it (gold) · `agentic:optimized:gpt-6-sol`

> The response provides no code at all. It refuses to produce an implementation, claiming docs mismatch, and asks for more information. The authoritative reference shows Popover as uncontrolled (button trigger opens it, browser closes it), with props anchorName, children, content,

#### Quick start — the @sanity/ui/styles.css import is required (gold) (2)

**🔴 0** · Task Completion · Quick start — the @sanity/ui/styles.css import is required (gold) · `openai:responses:gpt-6.1-terra`

> The response declines to attempt the task. It never adds the `@sanity/ui/styles.css` import to an entry file, never shows import ordering, and never addresses single-import placement. It asks for more documentation instead of delivering a solution, so none of the required behavio

**🔴 0** · Code Correctness · Quick start — the @sanity/ui/styles.css import is required (gold) · `openai:responses:gpt-6.1-terra`

> The candidate provides no code at all. It declines to supply an entry-point file and never mentions the required `@sanity/ui/styles.css` import, placed at the top of the entry file. None of the rubric's checks (exact import path, placement before rendering, no alternative styling

#### TextInput — v3 sizing, slot and validation props become density and hasError (gold) (2)

**🔴 0** · Task Completion · TextInput — v3 sizing, slot and validation props become density and hasError (gold) · `agentic:optimized:gpt-6-sol`

> The response provides no code and declines to attempt the migration. It satisfies none of the requirements: no density="loose", no visible validation message, no separate clear Button, and no retained type="url"/value/onChange wiring. The reference supplied `density` and `hasErro

**🔴 0** · Code Correctness · TextInput — v3 sizing, slot and validation props become density and hasError (gold) · `agentic:optimized:gpt-6-sol`

> The candidate provides no code at all. It declines to produce a rewrite, so none of the required elements are present: no TextInput with hasError, no error message element with id, no aria-describedby, no wrapping element for the 400px width, no import from '@sanity/ui', and no J

#### TooltipGroup — replaces v3's TooltipDelayGroupProvider; a rendered element with no delay prop (gold) (5)

**🔴 0** · Task Completion · TooltipGroup — replaces v3's TooltipDelayGroupProvider; a rendered element with no delay prop (gold) · `agentic:optimized:gpt-6-sol`

> The response declines to provide any code. It gives no ported toolbar, no Bold/Italic/Link buttons, no TooltipGroup, and no HStack with gap={1}. The reference confirms TooltipGroup exists and replaces TooltipDelayGroupProvider, so the task was feasible and the refusal was unwarra

**🔴 0** · Code Correctness · TooltipGroup — replaces v3's TooltipDelayGroupProvider; a rendered element with no delay prop (gold) · `agentic:optimized:gpt-6-sol`

> The candidate provides no code at all. It declines to implement the toolbar, so there is no TooltipGroup import, no Tooltip wrapping IconButtons with aria-labels, and no valid JSX. It fails every rubric check, even though the reference documents TooltipGroup as the replacement fo

**🔴 0** · Task Completion · TooltipGroup — replaces v3's TooltipDelayGroupProvider; a rendered element with no delay prop (gold) · `agentic:naive:gpt-6-sol`

> The response declines to provide any code. It does not deliver the ported toolbar with Bold, Italic, and Link buttons, nor use TooltipGroup with the HStack gap={1}. It cites v4 guidance rather than the reference's TooltipGroup, which replaces TooltipDelayGroupProvider. No attempt

**🔴 0** · Code Correctness · TooltipGroup — replaces v3's TooltipDelayGroupProvider; a rendered element with no delay prop (gold) · `agentic:naive:gpt-6-sol`

> The candidate provides no code at all. It refuses to give an implementation, so it never uses TooltipGroup from '@sanity/ui', never wraps the three Tooltips, never shows content props or IconButtons with aria-labels, and contains no valid JSX. It also mentions TooltipDelayGroupPr

**🔴 0** · Code Correctness · TooltipGroup — replaces v3's TooltipDelayGroupProvider; a rendered element with no delay prop (gold) · `agentic:naive:claude-opus-5-5`

> The response uses TooltipDelayGroupProvider (imported from '@sanity/ui/tooltip') with a `delay` prop, which the reference says TooltipGroup replaces. It never uses TooltipGroup, passes a delay prop, and substitutes Button/Inline for IconButton/HStack. It explicitly contradicts th

</details>

---

_Generated by [AI Literacy Framework](https://github.com/sanity-labs/ai-literacy-framework) · Nov 2, 2026, 7:26 PM UTC · [view detailed results](https://www.promptfoo.app/eval/eval-v7p-2026-11-02T19:05:49)_
