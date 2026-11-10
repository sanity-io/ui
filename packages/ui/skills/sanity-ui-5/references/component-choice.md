# Component choice — the when-to-use-which matrix

Picking the right component is taste. The wrong one still renders, and nothing flags the mistake. These are the calls examples cannot make for you.

## Layout primitives

| Need                                              | Use                                   | Not                                                     |
| ------------------------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| A simple vertical or horizontal stack with a gap  | `VStack` / `HStack`                   | `Flex` with hand-set direction                          |
| A flex child that grows, shrinks, or sets a basis | `Flex`, or a `Box` wrapping the stack | flex props on `VStack` / `HStack` (type error)          |
| A toned surface with its own density              | `Card`                                | `Box` with hand-set background                          |
| Layout or flex-child behavior around a surface    | `Box` wrapping a `Card`               | layout props on `Card` (type error)                     |
| A clickable element                               | `Button`                              | `Box as="button"` (inherits browser defaults, no reset) |

`VStack` and `HStack` expose only `as` and `gap`. That is the point — they are the simple case. Step up to `Flex` when you need more, do not force props onto the stack.

## Tables

| Need                         | Use                   |
| ---------------------------- | --------------------- |
| Read-only data display       | `data-table`          |
| Clickable or selectable rows | `sortable-data-table` |

`sortable-data-table` carries interaction wiring — `tabIndex`, `aria-selected`, `onKeyDown` — that is noise on a display-only table. Match the component to whether the row is interactive.

## Typography

| Need                               | Use                                  |
| ---------------------------------- | ------------------------------------ |
| A heading at a set level           | `Heading` with `as` set to the tag   |
| A visual size apart from the level | `Heading` `size`, set alongside `as` |

A `Heading` with no `as` renders `<h2>` in every context and breaks the hierarchy. Set the tag with `as`; control the look with `size`.

## The general rule

When two components both render the result, the one carrying less machinery is the Sanity choice. Range comes from composing the primitives, not from reaching for the heavier component.
