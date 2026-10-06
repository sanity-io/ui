---
name: react-devtools-mcp
description: Inspect and profile the React component tree of a running Storybook story through chrome-devtools-mcp (React DevTools over the Chrome DevTools Protocol, via react-devtools-cdt-mcp). Use when debugging why a @sanity/ui component re-renders, finding slow components, reading props and hooks at runtime, or investigating a perf regression in a story. Works from Cursor's MCP config and from the terminal (chrome-devtools CLI daemon), so it also works for cloud agents.
---

# React DevTools for agents (chrome-devtools-mcp + react-devtools-cdt-mcp)

[`react-devtools-cdt-mcp`](https://github.com/facebook/react/tree/main/packages/react-devtools-cdt-mcp)
is **not** an MCP server. It is a browser library that installs a lightweight React DevTools hook
in the page and registers twelve `react_*` tools that
[`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp) discovers through
its experimental third-party developer tools API (`--categoryExperimentalThirdParty=true`).
`chrome-devtools-mcp` is the MCP server; it talks to Chrome over the Chrome DevTools Protocol.

In this repo the Storybook dev server loads `react-devtools-cdt-mcp/register` in the preview
iframe when `ENABLE_REACT_DEVTOOLS_MCP=true` (plugin in `apps/storybook/.storybook/main.ts`).
Nothing changes for `pnpm dev` or the static build.

## Setup (three processes)

```bash
# 1. Storybook with the React DevTools hook installed (port 6006, long-running)
pnpm react-devtools-mcp:storybook

# 2. Chrome with the remote debugging port open, showing one story
#    (url defaults to iframe.html?viewMode=story&id=primitives-button--default)
pnpm react-devtools-mcp:chrome
pnpm react-devtools-mcp:chrome "http://localhost:6006/iframe.html?viewMode=story&id=components-menubutton--default"
pnpm react-devtools-mcp:chrome --headless            # no display (CI, cloud VM without X)

# 3. chrome-devtools-mcp attached to that Chrome — pick ONE of:
#    a) Cursor: .cursor/mcp.json already defines the `chrome-devtools` server with
#       --categoryExperimentalThirdParty=true --browserUrl=http://127.0.0.1:9222
#    b) Terminal / cloud agents (same tools, no MCP client needed):
pnpm --filter sanity-ui-storybook exec chrome-devtools start \
  --categoryExperimentalThirdParty=true --browserUrl=http://127.0.0.1:9222
```

Stories **must** be opened through `iframe.html?viewMode=story&id=<story-id>`. Tool discovery
only looks at the top-level document; the manager UI at `/` embeds stories in an iframe and
exposes nothing. Story ids are in `http://localhost:6006/index.json` (`primitives-button--default`,
`components-menubutton--default`, ...).

## Workflow

Every command below is shown for the CLI (`CD="pnpm --filter sanity-ui-storybook exec chrome-devtools"`).
Through MCP the tool names are identical (`list_pages`, `list_3p_developer_tools`,
`execute_3p_developer_tool`, `take_snapshot`, `click`, `navigate_page`); `params` is a JSON string.

```bash
$CD list_pages                                   # page ids; the story page is normally 1
$CD list_3p_developer_tools 1                    # REQUIRED once per page load: discovers the react_* tools
$CD execute_3p_developer_tool 1 react_get_component_tree --params '{"depth":40}'
$CD execute_3p_developer_tool 1 react_find_components --params '{"name":"Button"}'
$CD execute_3p_developer_tool 1 react_get_component_by_uid --params '{"uid":"r20","includeHooks":true}'
$CD execute_3p_developer_tool 1 react_get_component_source --params '{"uid":"r20"}'
$CD execute_3p_developer_tool 1 react_get_parent_stack --params '{"uid":"r20"}'

# Profile an interaction
$CD execute_3p_developer_tool 1 react_start_profiling --params '{"traceName":"open-menu"}'
$CD take_snapshot 1                              # find the element uid to interact with (e.g. 1_1)
$CD click 1 1_1
$CD execute_3p_developer_tool 1 react_stop_profiling
$CD execute_3p_developer_tool 1 react_get_trace_overview --params '{"traceName":"open-menu"}'
$CD execute_3p_developer_tool 1 react_get_commit_report --params '{"traceName":"open-menu","commitIndex":1}'

$CD navigate_page 1 --type url --url "http://localhost:6006/iframe.html?viewMode=story&id=<id>"
$CD stop                                         # stop the daemon when done
```

Add `--output-format json` for machine-readable output: the result is `{"message": "<json>"}`,
i.e. parse `message` a second time.

Tools: `react_get_component_tree`, `react_get_component_by_uid`, `react_get_component_by_dom_element`
(`{"element":{"uid":"1_1"}}` from `take_snapshot`), `react_find_components`,
`react_get_component_source`, `react_get_owner_stack_trace`, `react_get_parent_stack`,
`react_get_owner_stack`, `react_start_profiling`, `react_stop_profiling`,
`react_get_trace_overview`, `react_get_commit_report`.

## Reading the output

Component uids (`r20`) are stable across tools and re-renders but reset on page reload — re-run
`list_3p_developer_tools` and `react_get_component_tree` after `navigate_page` or a reload.
React Compiler output shows as `Forget(ButtonComponent)`; styled-components as `styled.button`.
Durations are milliseconds; `componentsChanged` counts fibers that rendered in that commit.

Real run against `components-menubutton--default` (profile around a click on the "Open" button):

```
$CD execute_3p_developer_tool 1 react_stop_profiling
{"status": "stopped", "traceName": "open-menu", "commits": 5}

$CD execute_3p_developer_tool 1 react_get_trace_overview --params '{"traceName":"open-menu"}'
[{"commit":0,"committedAt":732,"renderDuration":2.3,"layoutDuration":0.6,"passiveDuration":0.8,"componentsChanged":166},
 {"commit":1,"committedAt":739,"renderDuration":2.5,"layoutDuration":2.5,"passiveDuration":0.2,"componentsChanged":156},
 ...]

$CD execute_3p_developer_tool 1 react_get_commit_report --params '{"traceName":"open-menu","commitIndex":1}'
priority: Sync, 156 components, sorted by actualDuration:
  r150 forwardRef styled.div            actual=3.00 self=0.30
  r152 function   Forget(FlexComponent) actual=2.70 self=0.10
  r0   function   Forget(MenuButton)    actual=2.50 self=0.20
```

`react_get_component_source` resolves to the workspace source through Vite, e.g.
`http://localhost:6006/@fs/.../packages/ui/src/core/primitives/button/button.tsx:21`, and
`react_get_component_by_uid` with `includeHooks` lists hooks such as `Theme_v2` with their values.

## Gotchas

- `execute_3p_developer_tool` answers "Tool react_... not found" until `list_3p_developer_tools`
  has run for that page load.
- No `react` group listed: the page was not loaded from the `ENABLE_REACT_DEVTOOLS_MCP=true`
  server, or you are on the manager page (`/`) instead of `iframe.html`.
- The `chrome-devtools` CLI and the MCP server are the same daemon; do not run both against the
  same Chrome at once. `pnpm --filter sanity-ui-storybook exec chrome-devtools status` / `stop`.
- Chrome keeps running after `react-devtools-mcp:chrome` returns (it prints the pid); the profile
  is reused from `apps/storybook/node_modules/.cache/react-devtools-mcp/chrome-profile`.
- Prefer `--headless` on machines without a display; the script turns it on automatically when
  `DISPLAY` is unset on Linux. Set `CHROME_PATH` if Chrome is not found.
- To let `chrome-devtools-mcp` launch its own Chrome instead, drop `--browserUrl` (and skip step 2);
  then open the story with `navigate_page` or `new_page`.
