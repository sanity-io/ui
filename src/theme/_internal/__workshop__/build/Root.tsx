import styled from 'styled-components'

export const Root = styled.div`
  background: #000;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 13px;
  line-height: 9px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  user-select: none;

  pre {
    font: inherit;
    font-family: 'SF Mono', Menlo, monospace;
    margin: 0;
    padding: 0;
  }

  .button {
    background-color: var(--bg);
    color: var(--fg);
    box-shadow:
      inset 0 0 0 1px var(--border),
      0 1px 0 0 color-mix(in srgb, var(--border), transparent 75%);
    text-align: center;
    border-radius: 3px;
    font-weight: 500;
    cursor: default;
    transition: box-shadow 50ms ease-in-out;

    --bg: var(--button-enabled-bg);
    --fg: var(--button-enabled-fg);
    --border: var(--button-enabled-border);
    --bg2: var(--button-enabled-bg2);
    --muted-fg: var(--button-enabled-muted-fg);

    &:hover {
      --bg: var(--button-hovered-bg);
      --fg: var(--button-hovered-fg);
      --border: var(--button-hovered-border);
      --bg2: var(--button-hovered-bg2);
      --muted-fg: var(--button-hovered-muted-fg);
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 1px var(--border),
        0 0 0 1px var(--base-bg),
        0 0 0 3px var(--focus-ring);

      --bg: var(--button-hovered-bg);
      --fg: var(--button-hovered-fg);
      --border: var(--button-hovered-border);
      --bg2: var(--button-hovered-bg2);
      --muted-fg: var(--button-hovered-muted-fg);
    }

    &:active {
      background-color: var(--button-pressed-bg);
      color: var(--button-pressed-fg);
      box-shadow: inset 0 0 0 1px var(--border);
      --border: var(--button-pressed-border);
      --bg2: var(--button-pressed-bg2);
      --muted-fg: var(--button-pressed-muted-fg);
    }

    &.selected {
      background-color: var(--button-selected-bg);
      color: var(--button-selected-fg);
      box-shadow: inset 0 0 0 1px var(--border);
      --border: var(--button-selected-border);
      --bg2: var(--button-selected-bg2);
      --muted-fg: var(--button-selected-muted-fg);
    }

    &.disabled {
      background-color: var(--button-disabled-bg);
      color: var(--button-disabled-fg);
      box-shadow: inset 0 0 0 1px var(--border);
      --border: var(--button-disabled-border);
      --bg2: var(--button-disabled-bg2);
      --muted-fg: var(--button-disabled-muted-fg);
    }
  }

  .card {
    background-color: var(--bg);
    color: var(--fg);
    box-shadow: inset 0 0 0 1px var(--border);
    /* text-align: center; */
    border-radius: 3px;
    font-weight: 500;
    cursor: default;
    transition: box-shadow 50ms ease-in-out;

    --bg: var(--card-enabled-bg);
    --fg: var(--card-enabled-fg);
    --border: var(--card-enabled-border);
    --bg2: var(--card-enabled-bg2);
    --muted-fg: var(--card-enabled-muted-fg);

    &:hover {
      --bg: var(--card-hovered-bg);
      --fg: var(--card-hovered-fg);
      --border: var(--card-hovered-border);
      --bg2: var(--card-hovered-bg2);
      --muted-fg: var(--card-hovered-muted-fg);
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        inset 0 0 0 1px var(--border),
        0 0 0 1px var(--base-bg),
        0 0 0 3px var(--focus-ring);

      --bg: var(--card-hovered-bg);
      --fg: var(--card-hovered-fg);
      --border: var(--card-hovered-border);
      --bg2: var(--card-hovered-bg2);
      --muted-fg: var(--card-hovered-muted-fg);
    }

    &:active {
      background-color: var(--card-pressed-bg);
      color: var(--card-pressed-fg);
      box-shadow: inset 0 0 0 1px var(--border);
      --border: var(--card-pressed-border);
      --bg2: var(--card-pressed-bg2);
      --muted-fg: var(--card-pressed-muted-fg);
    }

    &.selected {
      background-color: var(--card-selected-bg);
      color: var(--card-selected-fg);
      box-shadow: inset 0 0 0 1px var(--border);
      --border: var(--card-selected-border);
      --bg2: var(--card-selected-bg2);
      --muted-fg: var(--card-selected-muted-fg);
    }

    &.disabled {
      background-color: var(--card-disabled-bg);
      color: var(--card-disabled-fg);
      box-shadow: inset 0 0 0 1px var(--border);
      --border: var(--card-disabled-border);
      --bg2: var(--card-disabled-bg2);
      --muted-fg: var(--card-disabled-muted-fg);
    }
  }

  .input {
    background-color: var(--bg);
    color: var(--fg);
    padding: 12px;
    box-shadow: inset 0 0 0 1px var(--border);
    font-size: 16px;
    line-height: 11px;
    /* text-align: center; */
    border-radius: 3px;
    /* font-weight: 500; */
    cursor: default;
    transition: box-shadow 50ms ease-in-out;

    .placeholder {
      color: var(--placeholder);
    }

    --bg: var(--input-enabled-bg);
    --bg2: var(--input-enabled-bg2);
    --fg: var(--input-enabled-fg);
    --border: var(--input-enabled-border);
    --placeholder: var(--input-enabled-placeholder);

    &:hover {
      --bg: var(--input-hovered-bg);
      --bg2: var(--input-hovered-bg2);
      --fg: var(--input-hovered-fg);
      --border: var(--input-hovered-border);
      --placeholder: var(--input-hovered-placeholder);
    }

    &:focus,
    &.readOnly:focus {
      outline: none;
      box-shadow: inset 0 0 0 1px var(--focus-ring);

      --bg: var(--input-hovered-bg);
      --bg2: var(--input-hovered-bg2);
      --fg: var(--input-hovered-fg);
      --border: var(--input-hovered-border);
      --placeholder: var(--input-hovered-placeholder);
    }

    &.readOnly {
      --bg: var(--input-readOnly-bg);
      --bg2: var(--input-readOnly-bg2);
      --fg: var(--input-readOnly-fg);
      --border: var(--input-readOnly-border);
      --placeholder: var(--input-readOnly-placeholder);
    }

    &.disabled {
      --bg: var(--input-disabled-bg);
      --bg2: var(--input-disabled-bg2);
      --fg: var(--input-disabled-fg);
      --border: var(--input-disabled-border);
      --placeholder: var(--input-readOnly-placeholder);
    }
  }
`
