# Components and patterns

Read this file when you choose a component, check whether it exists, or look for starter code.

## Contents

- How to check a component before you use it
- What exists in alpha.20
- Not exported yet
- Which component for which job
- Constraints that bite
- Patterns: where to find them

## How to check a component before you use it

1. Check its status in the table below, or in `docs/overview/component-reference.dsds.yaml`.
2. Check the export with the listing in `setup.md`. An unexported import is a build error.
3. Read its constraints in `docs/components/<id>.dsds.yaml`.

Status values:

| Status       | Meaning                                                                    |
| ------------ | -------------------------------------------------------------------------- |
| stable       | Exported and ready                                                         |
| beta         | Exported and ready. The API may change before 5.0                          |
| experimental | Exported, marked `@alpha` in the source. The API can change without notice |
| deprecated   | Exported. Do not use it in new code                                        |
| unavailable  | Not exported. Importing it is a build error                                |

## What exists in alpha.20

These 41 components are exported, plus the hook `useIsClient`.

| Group       | Component      | Status       | Use it for                                                                                  |
| ----------- | -------------- | ------------ | ------------------------------------------------------------------------------------------- |
| Layout      | Box            | stable       | Spacing, borders, scroll containers, landmarks                                              |
|             | Flex           | stable       | Row or column layout with alignment and gap                                                 |
|             | Grid           | stable       | CSS grid with named props                                                                   |
|             | Container      | stable       | Max width and centering for content                                                         |
|             | Card           | stable       | A surface with background, border, and tone                                                 |
|             | HStack         | stable       | A simple row with a gap. It wraps by default                                                |
|             | VStack         | stable       | A simple column with a gap                                                                  |
|             | Divider        | stable       | A horizontal rule between sections                                                          |
|             | Inline         | deprecated   | Use HStack instead                                                                          |
| Text        | Text           | stable       | Body text, captions, metadata                                                               |
|             | Heading        | stable       | Headings. Set `as` every time                                                               |
|             | Eyebrow        | stable       | Small uppercase text above a title                                                          |
|             | Code           | stable       | Inline code and code blocks                                                                 |
|             | KBD            | experimental | One keyboard key                                                                            |
|             | Hotkeys        | experimental | A multi-key shortcut                                                                        |
|             | Icon           | stable       | A sized, tonable icon from `@sanity/icons`                                                  |
|             | VisuallyHidden | stable       | Text for assistive technology only                                                          |
| Actions     | Button         | beta         | Actions, with a text label                                                                  |
|             | IconButton     | beta         | Actions with only an icon                                                                   |
|             | PressArea      | beta         | Makes a non-interactive surface a press target                                              |
|             | Link           | beta         | Navigation to a URL or fragment                                                             |
|             | SkipToContent  | beta         | A skip link for keyboard users                                                              |
| Input       | TextInput      | beta         | One line of text                                                                            |
|             | TextArea       | beta         | Multi-line text                                                                             |
|             | Select         | beta         | One choice from 5 to 20 options                                                             |
|             | Radio          | beta         | One choice from 2 to 4 options                                                              |
|             | Checkbox       | beta         | One or several independent choices                                                          |
|             | Switch         | beta         | A binary setting that takes effect at once                                                  |
| Information | Badge          | beta         | A short status or category label                                                            |
|             | Avatar         | beta         | A person or agent                                                                           |
|             | AvatarStack    | beta         | A group of avatars                                                                          |
|             | AvatarCounter  | beta         | A count for hidden avatars                                                                  |
|             | Indicator      | beta         | A status dot                                                                                |
|             | IndicatorStack | stable       | Two or more adjacent status dots                                                            |
|             | List           | beta         | Structured rows. Includes `List.Item`, `List.ItemText`, `List.ItemImage`, `List.ButtonItem` |
| Disclosure  | Popover        | beta         | Secondary content on press                                                                  |
|             | Tooltip        | beta         | A text label on hover or focus                                                              |
|             | TooltipGroup   | beta         | Wraps a toolbar of tooltips                                                                 |
|             | Dialog         | beta         | A blocking task or decision                                                                 |
|             | Tabs           | beta         | Switching between related sections. Includes `Tabs.List`, `Tabs.Tab`, `Tabs.Panel`          |
| Feedback    | Spinner        | beta         | A loading indicator, with a text label                                                      |

Statuses come from the documentation. Confirm each export with the listing in `setup.md`.

## Not exported yet

Do not import these. Each import fails the build. Their docs sit in `drafts/` and describe a future API.

- Autocomplete
- Menu, MenuButton, MenuGroup, MenuItem
- SegmentedControl
- Skeleton
- Toast
- Label (v5 has no Label. Use `Text as="label"`, and `Eyebrow` for small uppercase text)
- Image

When you need one of these, build a stand-in from components that exist, and tell the user. Check the export listing again later, since the set grows.

## Which component for which job

| Need                                       | Use                                                | Not                              |
| ------------------------------------------ | -------------------------------------------------- | -------------------------------- |
| Spacing, border, or a scroll area          | Box                                                | Card                             |
| A toolbar, sidebar, or nav header          | Box or Flex                                        | Card                             |
| Content with a background and border       | Card                                               | Box with a custom background     |
| Simple column or row with a gap            | VStack or HStack                                   | Flex with defaults               |
| A column that grows, scrolls, or wraps     | Flex                                               | VStack                           |
| Icon with text                             | Button with `iconStart`                            | Icon inside a Button             |
| Icon alone                                 | IconButton                                         | Button with no text              |
| Make a card or row clickable               | PressArea around the content, or `List.ButtonItem` | `onClick` on Card or Box         |
| Move to a URL                              | Link, or `as="a"` on a row                         | Button with a navigation handler |
| Run an action                              | Button                                             | Link                             |
| Hover or focus hint, text only             | Tooltip                                            | Popover                          |
| Interactive floating content               | Popover                                            | Tooltip                          |
| Blocking decision                          | Dialog                                             | Popover                          |
| Page title and section titles              | Heading with `as`                                  | Text with a large size           |
| Large number or display text               | Text with a large `size`                           | Heading                          |
| Two to four options                        | Radio                                              | Select                           |
| Five to 20 options                         | Select                                             | Radio                            |
| Independent options, or a deferred setting | Checkbox                                           | Switch                           |
| A setting that applies immediately         | Switch                                             | Checkbox plus a Save button      |

## Constraints that bite

Read `docs/components/<id>.dsds.yaml` for the full set. These are the ones that cause the most rework.

- **Button.** Use it with a text label. Use `IconButton` for icon-only actions. Do not place a Tooltip on a disabled button. Do not disable a submit button to block an incomplete form. Allow submission and show feedback.
- **IconButton.** `icon` and `aria-label` are both required. Do not use it in a Dialog or a decision prompt. Use a Button with a visible label.
- **Tooltip.** It wraps one child, and the child must be a button, a link, or a `PressArea`. It needs the polyfills import. It must not hold links or buttons. It names nothing: `content` becomes the description, not the name.
- **Popover.** It has no `open`, `onOpen`, or `onClose` prop. Its trigger opens it, and the browser closes it on Escape or an outside click. Do not mirror its state in React state. Open it on press, not on hover. Show one at a time.
- **Dialog.** Give it an accessible name through `header` or `aria-label`. Make it dismissible. Name the action and its target in a destructive title, such as "Delete Annual report?". It needs the polyfills import.
- **Tabs.** It is controlled: pass `value` and `onValueChange`. Each tab and panel takes the same `value`, and each value is unique in one `Tabs`. Do not render `Tabs.Tab` or `Tabs.Panel` outside `Tabs`. Do not nest tabs.
- **Select.** Pass `option` and `optgroup` elements as children. Do not draw your own arrow.
- **TextInput.** Use `hasError` for the error style. It sets `aria-invalid` and renders no message. Do not set `aria-invalid` by hand. Do not set `type` to a non-text type such as `checkbox` or `file`. Do not stack more than two inputs in a row.
- **List.** It has no `density` prop. Set `density` on each item. `List.Item` always renders `<li>`. Provide `alt` on every `List.ItemImage`. Keep one interactive element in a row's start or end slot.
- **PressArea.** It renders a real `<button>` or `<a>`. Never use it as a backdrop or layout wrapper. Never pass `as="div"`. Do not style it. Put padding and background on the child. Do not nest interactive elements inside it.
- **Heading.** `as` takes `h1` to `h6` only. Use Heading for real headings, not for large text.
- **Text.** Do not use it for headings. Do not give it a non-neutral tone unless it leads with the state or sits beside a matching icon. Keep multi-line paragraphs start-aligned. Keep 4.5:1 contrast.
- **Icon.** An icon with meaning on its own needs `aria-label`. A decorative icon needs nothing, because it hides itself when it has no `aria-label`. Never put an Icon inside an interactive element.
- **Badge.** Do not use it for actions or put emoji in it. Lead a toned badge's text with the state, or add `iconStart`.
- **Avatar.** `name` is required. There is no `initials` prop. Do not size it with `style`.
- **Spinner.** Pair it with a visible text label. It has no `tone` or `muted`. Set the container's `aria-busy`. Skip it for tasks under 200ms.
- **HStack.** It accepts only `as` and `gap`. It wraps by default. Use Flex for a row that must stay on one line.
- **Indicator.** Give it a `label` when it is the only status signal. Use `IndicatorStack` for adjacent dots.
- **Link.** Do not use it to run a side effect. Use `openInNewTab` instead of setting `target` by hand.
- **VisuallyHidden.** Do not put a button or link inside it. Do not use it to hide content you will show later.

## Patterns

Patterns cover the layouts and interactions that span components. They are in `docs/patterns/`. Read the pattern that matches the task before you build the layout from primitives. The patterns name the accessibility requirements that cause most failures.
