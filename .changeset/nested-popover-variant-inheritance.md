---
"@sanity/ui": patch
---

Fixed non-animated `Popover` and `Tooltip` cards inheriting motion variants from an animated ancestor popover, which left them stuck at `opacity: 0`. `MenuGroup` submenus inside a `MenuButton` with `popover={{animate: true}}` never became visible as a result.
