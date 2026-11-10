# Forms and accessibility

Read this file before you build a form, an error state, or any interactive UI. WCAG 2.2 AA is a hard requirement. Build it in from the start.

## Contents

- Choose the control
- Name every field
- Controlled state
- Error states
- Form copy
- Groups
- Interactive UI
- Page structure and reflow
- Tone and color
- Check your work

## Choose the control

| User task                           | Control                         |
| ----------------------------------- | ------------------------------- |
| One of 2 to 4 options               | Radio                           |
| One of 5 to 20 options              | Select                          |
| One of more than 20 options         | TextInput with a search pattern |
| Several options at once             | Checkbox                        |
| A setting that takes effect at once | Switch                          |
| A setting submitted with a form     | Checkbox, not Switch            |

A Switch commits on `onChange`. Do not add a Save button beside it, and do not pair it with a confirm button.

## Name every field

Every field needs a visible label and an accessible name. Checkbox, Radio, and Switch render no label of their own, and they have no `label` prop. Passing one is a type error. Name them in one of these ways, in this order of preference:

1. A visible label element linked with `id` and `htmlFor`.
2. A descriptive label wrapped in `VisuallyHidden`, when the visible text would repeat across rows.
3. `aria-labelledby`, when the text already exists elsewhere in the DOM.
4. `aria-label`, when none of the above fits. Include the visible text in it. Voice-control users can then target the control.

```tsx
<VStack gap={2}>
  <Text as="label" htmlFor="project" size={1} weight="medium">
    Project name
  </Text>
  <TextInput id="project" />
</VStack>

<Flex alignItems="center" gap={2}>
  <Checkbox id="terms" />
  <Text as="label" htmlFor="terms" size={1}>
    Accept the terms
  </Text>
</Flex>

{/* A row checkbox in a table: the label is hidden, the name stays descriptive */}
<Checkbox id={`select-${doc.id}`} />
<VisuallyHidden as="label" htmlFor={`select-${doc.id}`}>
  Select {doc.title}
</VisuallyHidden>
```

Rules:

- Do not use a placeholder as the label. It disappears when the user types, and screen readers do not announce it reliably.
- Do not nest one label element inside another.
- Do not skip the link between label and input. A label with no `htmlFor` and no wrapping does not name the input.
- An input with no accessible name is a critical axe violation.
- Mark optional fields in the label, as in `Phone number (optional)`. Do not mark required fields. If most fields are optional, mark the required ones and use one convention across the form.

## Controlled state

- Pair `checked` with `onChange` on every controlled Checkbox, Radio, and Switch. Without `onChange`, the control looks live and never updates.
- Do not set both `checked` and `defaultChecked` on one control.
- Radios in one group share a `name`. Neither Radio nor Sanity UI groups them for you.
- Lay out checkbox and radio groups vertically. Stack fields vertically as well. Place fields side by side only for a small group of related fields.

## Error states

`hasError` sets the error style and `aria-invalid`. It renders no message. Add the message and link it with `aria-describedby`.

```tsx
<VStack gap={2}>
  <Text as="label" htmlFor="email" size={1} weight="medium">
    Email address
  </Text>
  <TextInput id="email" hasError aria-describedby="email-error" value={value} onChange={onChange} />
  <Text id="email-error" size={1} tone="critical">
    Error: Enter a valid email address.
  </Text>
</VStack>
```

- Show a visible message near the field whenever `hasError` is set.
- Do not set `aria-invalid` by hand. The input writes it from `hasError`.
- Never disable an input in an error state. A disabled field cannot take focus. The user cannot reach it to fix the problem.
- Radio has no error prop. Show a message near the group and link it with `aria-describedby`.
- A disabled input needs helper text that says why it is off and what turns it on.
- A top-of-form error summary names the total, such as "3 fields need attention.", and links to the first error. Do not repeat every error in it.

## Form copy

- Labels are noun phrases in sentence case, one to three words, with no trailing colon or period: `Phone number`, not `Enter your phone number`.
- A label is not a question, an instruction, or a request.
- A placeholder shows an example, such as `ex: Jane Cooper` or `(555) 123-4567`. Keep it short. Do not put format rules in it. Put format hints in helper text, which stays visible.
- Helper text is a complete sentence ending in a period. Keep it under 60 characters when you can. Skip it when it repeats the label or placeholder.
- Error text names what failed and states the next step. Keep it factual. Do not apologize and do not blame: write `Email address is missing an @ symbol. Use the format name@example.com.`
- Success text states what happened: `Project created.`, not `Success!`
- Button labels describe the action: `Save changes`, `Send invitation`, `Create project`. Avoid `Submit`, `OK`, and `Done`. A destructive confirmation repeats the action: `Delete project`, not `Confirm`.
- Do not mix `Cancel`, `Back`, and `Close` on one control. Cancel abandons a change. Back returns to a step. Close dismisses.
- Do not use emojis. Use an `Icon`.

## Groups

Wrap checkbox and radio groups in a `fieldset` with a `legend`. A legend names the group only. Each field still needs its own label. Reset the fieldset's default border, padding, and margin. Put the legend text in a `Text`.

```tsx
<fieldset style={{border: 0, padding: 0, margin: 0}}>
  <legend>
    <Text size={1} weight="medium">
      Notify me about
    </Text>
  </legend>
  <VStack gap={2}>
    <Flex alignItems="center" gap={2}>
      <Checkbox id="n-comments" />
      <Text as="label" htmlFor="n-comments" size={1}>
        Comments
      </Text>
    </Flex>
    <Flex alignItems="center" gap={2}>
      <Checkbox id="n-mentions" />
      <Text as="label" htmlFor="n-mentions" size={1}>
        Mentions
      </Text>
    </Flex>
  </VStack>
</fieldset>
```

The `style` on the native `fieldset` is correct. Sanity UI has no fieldset component.

## Interactive UI

- Every icon-only control has an `aria-label` on the control. Describe the action, not the icon: `Delete document`, not `Trash`. A tooltip does not name a control.
- Do not put a Tooltip on a disabled or loading control. Keyboard users cannot reach it. If the tooltip must show, wrap the element in a `PressArea` and put the Tooltip on that.
- To keep a button focusable while it blocks an action, use `aria-disabled`, not `disabled`.
- Set `aria-pressed` on a two-state toggle button. Keep its label the same in every state and name the action, not the state.
- Do not put `onClick` on Box or Card. Use Button, or wrap the surface in `PressArea`.
- A row that navigates is a link: `as="a"` and `href`. Middle-click and "Open in new tab" then work.
- Never nest interactive elements, such as a Button inside a PressArea, or a Button inside a Link.
- Do not suppress the focus ring. Keep a visible focus indicator.
- Size touch targets at least 24 by 24 pixels.
- Use Button for any clickable control. Do not make Badge or Avatar clickable on their own.

```tsx
<Tooltip content="Delete document">
  <IconButton icon={TrashIcon} aria-label="Delete document" tone="critical" />
</Tooltip>
```

Destructive actions use `tone="critical"`, an icon that reads as destructive, and a verb in the label that names what is lost.

## Page structure and reflow

- Render one `<main>`. Use `as="main"`, unless an outer shell already provides one.
- Render shell regions as landmarks: `as="nav"`, `as="main"`, and `as="aside"` for an inspector.
- Put `SkipToContent` first in the layout, with an `href` that matches the main region's `id`.
- Use one `<h1>` for the page title. Do not skip heading levels. Set `as` on every Heading.
- Set `lang` on the `<html>` element.
- Build tables from native elements: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`. Give each a `<caption>`, which may be visually hidden. Do not use `Box as="table"` or simulate a table with Flex or Grid.
- Layouts must work at 320px with no horizontal scroll. Add `flexWrap="wrap"` to rows of two or more children. Add `minWidth="0"` to flex children that hold text. Use `maxWidth`, not `width`, for sidebars. Do not give a sidebar a fixed `width` with `flexShrink={0}` at every width.
- Use `truncate` on Text and Heading for clipped text, not custom CSS.

## Tone and color

- Use `tone` only for a real state: `positive` for success, `caution` for a warning, `critical` for an error or destructive action, `suggest` for guidance. Everything else stays `neutral`.
- Tone is one channel. Pair it with words that lead with the state, such as `Error: Process timed out.`, or with an icon. A toned `Text` that only describes the event, such as `Timed out`, needs the icon.
- Keep text at 4.5:1 contrast and field borders at 3:1.
- Placeholder text also needs 4.5:1 contrast.
- Never rely on color alone to carry a state.

## Check your work

1. Run `tsc --noEmit`.
2. Read each form component's document in `docs/components/` again, and check its rules against your code.
3. Tab through the page. Every control must take focus, show a ring, and work with Enter or Space.
4. Resize to 320px wide. Nothing scrolls sideways.
5. Switch to dark mode. Nothing disappears.
6. If axe is available, run it. Fix every critical violation.
