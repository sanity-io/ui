import {css, styled} from 'styled-components'

export const Root = styled.div(
  ({theme}) => css`
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

    .base {
      background-color: var(--bg);
      color: var(--fg);
    }

    .button {
      --border-width: ${theme.sanity.button.border.width}px;

      --bg: var(--button-enabled-bg);
      --bg2: var(--button-enabled-bg2);
      --fg: var(--button-enabled-fg);
      --icon: var(--button-enabled-icon);
      --border: var(--button-enabled-border);
      --muted-fg: var(--button-enabled-muted-fg);
      --accent-fg: var(--button-enabled-accent-fg);
      --link-fg: var(--button-enabled-link-fg);
      --code-bg: var(--button-enabled-code-bg);
      --code-fg: var(--button-enabled-code-fg);
      --skeleton-from: var(--button-enabled-skeleton-from);
      --skeleton-to: var(--button-enabled-skeleton-to);

      background-color: var(--bg);
      color: var(--fg);
      box-shadow: inset 0 0 0 var(--border-width) var(--border);
      text-align: center;
      border-radius: var(--radius-2);
      font-weight: 500;
      cursor: default;
      transition: box-shadow 50ms ease-in-out;
      outline: none;
      justify-content: center;
      align-items: center;

      &:hover {
        --bg: var(--button-hovered-bg);
        --bg2: var(--button-hovered-bg2);
        --fg: var(--button-hovered-fg);
        --icon: var(--button-hovered-icon);
        --border: var(--button-hovered-border);
        --muted-fg: var(--button-hovered-muted-fg);
        --accent-fg: var(--button-hovered-accent-fg);
        --link-fg: var(--button-hovered-link-fg);
        --code-bg: var(--button-hovered-code-bg);
        --code-fg: var(--button-hovered-code-fg);
        --skeleton-from: var(--button-hovered-skeleton-from);
        --skeleton-to: var(--button-hovered-skeleton-to);
      }

      &:focus-visible {
        box-shadow:
          inset 0 0 0 var(--border-width) var(--border),
          0 0 0 1px var(--base-bg),
          0 0 0 3px var(--focus-ring);

        --bg: var(--button-hovered-bg);
        --bg2: var(--button-hovered-bg2);
        --fg: var(--button-hovered-fg);
        --icon: var(--button-hovered-icon);
        --border: var(--button-hovered-border);
        --muted-fg: var(--button-hovered-muted-fg);
        --accent-fg: var(--button-hovered-accent-fg);
        --link-fg: var(--button-hovered-link-fg);
        --code-bg: var(--button-hovered-code-bg);
        --code-fg: var(--button-hovered-code-fg);
        --skeleton-from: var(--button-hovered-skeleton-from);
        --skeleton-to: var(--button-hovered-skeleton-to);
      }

      &:active {
        --bg: var(--button-pressed-bg);
        --bg2: var(--button-pressed-bg2);
        --fg: var(--button-pressed-fg);
        --icon: var(--button-pressed-icon);
        --border: var(--button-pressed-border);
        --muted-fg: var(--button-pressed-muted-fg);
        --accent-fg: var(--button-pressed-accent-fg);
        --link-fg: var(--button-pressed-link-fg);
        --code-bg: var(--button-pressed-code-bg);
        --code-fg: var(--button-pressed-code-fg);
        --skeleton-from: var(--button-pressed-skeleton-from);
        --skeleton-to: var(--button-pressed-skeleton-to);
      }

      &.selected {
        --bg: var(--button-selected-bg);
        --bg2: var(--button-selected-bg2);
        --fg: var(--button-selected-fg);
        --icon: var(--button-selected-icon);
        --border: var(--button-selected-border);
        --muted-fg: var(--button-selected-muted-fg);
        --accent-fg: var(--button-selected-accent-fg);
        --link-fg: var(--button-selected-link-fg);
        --code-bg: var(--button-selected-code-bg);
        --code-fg: var(--button-selected-code-fg);
        --skeleton-from: var(--button-selected-skeleton-from);
        --skeleton-to: var(--button-selected-skeleton-to);
      }

      &.disabled {
        --bg: var(--button-disabled-bg);
        --bg2: var(--button-disabled-bg2);
        --fg: var(--button-disabled-fg);
        --icon: var(--button-disabled-icon);
        --border: var(--button-disabled-border);
        --muted-fg: var(--button-disabled-muted-fg);
        --accent-fg: var(--button-disabled-accent-fg);
        --link-fg: var(--button-disabled-link-fg);
        --code-bg: var(--button-disabled-code-bg);
        --code-fg: var(--button-disabled-code-fg);
        --skeleton-from: var(--button-disabled-skeleton-from);
        --skeleton-to: var(--button-disabled-skeleton-to);
      }
    }

    .card {
      --border-width: ${theme.sanity.card.border.width}px;

      --bg: var(--card-enabled-bg);
      --bg2: var(--card-enabled-bg2);
      --fg: var(--card-enabled-fg);
      --icon: var(--card-enabled-icon);
      --border: var(--card-enabled-border);
      --muted-fg: var(--card-enabled-muted-fg);
      --accent-fg: var(--card-enabled-accent-fg);
      --link-fg: var(--card-enabled-link-fg);
      --code-bg: var(--card-enabled-code-bg);
      --code-fg: var(--card-enabled-code-fg);
      --skeleton-from: var(--card-enabled-skeleton-from);
      --skeleton-to: var(--card-enabled-skeleton-to);

      background-color: var(--bg);
      color: var(--fg);
      box-shadow: inset 0 0 0 var(--border-width) var(--border);
      border-radius: var(--radius-2);
      font-weight: 500;
      cursor: default;
      transition: box-shadow 50ms ease-in-out;
      outline: none;

      &:hover {
        --bg: var(--card-hovered-bg);
        --bg2: var(--card-hovered-bg2);
        --fg: var(--card-hovered-fg);
        --icon: var(--card-hovered-icon);
        --border: var(--card-hovered-border);
        --muted-fg: var(--card-hovered-muted-fg);
        --accent-fg: var(--card-hovered-accent-fg);
        --link-fg: var(--card-hovered-link-fg);
        --code-bg: var(--card-hovered-code-bg);
        --code-fg: var(--card-hovered-code-fg);
        --skeleton-from: var(--card-hovered-skeleton-from);
        --skeleton-to: var(--card-hovered-skeleton-to);
      }

      &:focus-visible {
        box-shadow:
          inset 0 0 0 var(--border-width) var(--border),
          0 0 0 1px var(--base-bg),
          0 0 0 3px var(--focus-ring);

        /* --bg: var(--card-hovered-bg);
        --bg2: var(--card-hovered-bg2);
        --fg: var(--card-hovered-fg);
        --icon: var(--card-hovered-icon);
        --border: var(--card-hovered-border);
        --muted-fg: var(--card-hovered-muted-fg);
        --accent-fg: var(--card-hovered-accent-fg);
        --link-fg: var(--card-hovered-link-fg);
        --code-bg: var(--card-hovered-code-bg);
        --code-fg: var(--card-hovered-code-fg);
        --skeleton-from: var(--card-hovered-skeleton-from);
        --skeleton-to: var(--card-hovered-skeleton-to); */
      }

      &:active {
        --bg: var(--card-pressed-bg);
        --bg2: var(--card-pressed-bg2);
        --fg: var(--card-pressed-fg);
        --icon: var(--card-pressed-icon);
        --border: var(--card-pressed-border);
        --muted-fg: var(--card-pressed-muted-fg);
        --accent-fg: var(--card-pressed-accent-fg);
        --link-fg: var(--card-pressed-link-fg);
        --code-bg: var(--card-pressed-code-bg);
        --code-fg: var(--card-pressed-code-fg);
        --skeleton-from: var(--card-pressed-skeleton-from);
        --skeleton-to: var(--card-pressed-skeleton-to);
      }

      &.selected {
        --bg: var(--card-selected-bg);
        --bg2: var(--card-selected-bg2);
        --fg: var(--card-selected-fg);
        --icon: var(--card-selected-icon);
        --border: var(--card-selected-border);
        --muted-fg: var(--card-selected-muted-fg);
        --accent-fg: var(--card-selected-accent-fg);
        --link-fg: var(--card-selected-link-fg);
        --code-bg: var(--card-selected-code-bg);
        --code-fg: var(--card-selected-code-fg);
        --skeleton-from: var(--card-selected-skeleton-from);
        --skeleton-to: var(--card-selected-skeleton-to);
      }

      &.disabled {
        --bg: var(--card-disabled-bg);
        --bg2: var(--card-disabled-bg2);
        --fg: var(--card-disabled-fg);
        --icon: var(--card-disabled-icon);
        --border: var(--card-disabled-border);
        --muted-fg: var(--card-disabled-muted-fg);
        --accent-fg: var(--card-disabled-accent-fg);
        --link-fg: var(--card-disabled-link-fg);
        --code-bg: var(--card-disabled-code-bg);
        --code-fg: var(--card-disabled-code-fg);
        --skeleton-from: var(--card-disabled-skeleton-from);
        --skeleton-to: var(--card-disabled-skeleton-to);
      }
    }

    .input {
      background-color: var(--bg);
      color: var(--fg);
      padding: var(--space-3);
      box-shadow: inset 0 0 0 ${theme.sanity.input.border.width}px var(--border);
      font-size: 16px;
      line-height: 11px;
      border-radius: var(--radius-2);
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
        --bg: var(--input-read-only-bg);
        --bg2: var(--input-read-only-bg2);
        --fg: var(--input-read-only-fg);
        --border: var(--input-read-only-border);
        --placeholder: var(--input-read-only-placeholder);
      }

      &.disabled {
        --bg: var(--input-disabled-bg);
        --bg2: var(--input-disabled-bg2);
        --fg: var(--input-disabled-fg);
        --border: var(--input-disabled-border);
        --placeholder: var(--input-disabled-placeholder);
      }
    }

    .bg2 {
      background-color: var(--bg2);
    }

    .border {
      border: 1px solid var(--border);
    }

    .icon {
      color: var(--icon);
    }

    .muted-fg {
      color: var(--muted-fg);
    }

    .accent-fg {
      color: var(--accent-fg);
    }

    .link-fg {
      color: var(--link-fg);
    }

    .code {
      background-color: var(--code-bg);
      color: var(--code-fg);
    }

    .skeleton-from {
      color: var(--skeleton-from);
    }

    .skeleton-to {
      color: var(--skeleton-to);
    }
  `,
)
