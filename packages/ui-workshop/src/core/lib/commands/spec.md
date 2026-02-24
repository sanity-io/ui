# Commands System Specification

This document specifies a small “commands” system for a GUI/tooling app. The system:

- Defines **commands** (things the app can do)
- Binds commands to **keyboard input** (chords and sequences)
- Supports **layers** (global, mode, modal) with modal exclusivity
- Allows **dynamic registration/unregistration** without re-subscribing DOM listeners
- Exposes an **observable view of currently active commands** to drive a Command Palette UI
- Uses a **simple reducer-based state machine** for sequences

This spec intentionally avoids complex conditional enablement (`when` predicates). Instead, command availability is controlled by which layers are currently registered/active.

---

## Terminology

### Command

A uniquely identified action the application can execute (e.g. `zoom.in`, `viewport.next`, `nav.home`).

### Binding

A mapping from keyboard input to a command. A command may have multiple bindings.

### Chord

Keys pressed simultaneously (e.g. `Mod` + `=`).

### Sequence

Keys pressed in order within a time window (e.g. `g` then `h`). “Keyboard shortcut sequence”.

### Layer

A named collection of bindings that can be added/removed dynamically. Layers determine which bindings are active.

### Modal exclusivity

When an **exclusive** modal layer is present, it disables **parent** (mode) layers while remaining layers (modal + global) stay active.

---

## Non-goals

- OS-level global hotkeys
- Pointer/mouse gestures
- Remapping UI / keybinding editor
- IME- and composition-aware text editing behavior beyond basic guards
- Multi-user or remote command execution

---

## Core API

### createCommands

```ts
createCommands(options?: {
  target?: Window | Document
  sequenceTimeoutMs?: number   // default 800
  blockOnEditableTarget?: boolean // default true
  includeGlobalDuringExclusiveModal?: boolean // default true
  platform?: 'mac' | 'other'   // override platform detection (for testing)
}): Commands
```

Creates a Commands instance and **mounts a single `keydown` listener immediately**.

### Commands interface

```ts
type Commands = {
  // Registration
  registerGlobal(bindings: CommandBinding[]): Unregister
  setModeLayer(name: string, bindings: CommandBinding[]): Unregister
  pushModal(name: string, bindings: CommandBinding[], opts?: {exclusive?: boolean}): Unregister
  registerLayer(name: string, bindings: CommandBinding[], opts?: {exclusive?: boolean}): Unregister

  // Registry controls
  clearLayer(name: string): void
  setLayerEnabled(name: string, enabled: boolean): void
  setEnabled(enabled: boolean): void

  // Execution
  run(id: CommandId, ctx?: RunContext): void
  setRunner(runner: CommandRunner): void

  // Observation (for Command Palette)
  getActiveBindings(): ActiveBinding[]
  subscribe(listener: (active: ActiveBinding[]) => void): Unsubscribe

  // Lifecycle
  unsubscribe(): void
}
```

Where:

```ts
type CommandId = string
type Unregister = () => void
type Unsubscribe = () => void

type RunContext = {
  event?: KeyboardEvent
  source?: 'keyboard' | 'palette' | 'api'
}
type CommandRunner = (id: CommandId, ctx: RunContext) => void
```

**Notes**

- The Commands system **does not own** command metadata (title, description, icons). Those belong to your “command machine” / app registry.
- The Commands system **does own** input bindings, layer activity, and keyboard event routing.

---

## Binding Types

### CommandBinding

```ts
type KeyToken = 'mod' | 'ctrl' | 'meta' | 'shift' | 'alt' | string

type CommandBindingBase = {
  id: CommandId
  preventDefault?: boolean // default true
  stopPropagation?: boolean // default false
  allowInEditableTarget?: boolean // default false
  allowRepeat?: boolean // default false - allow command to execute on key repeat
  // Optional label purely for debugging/telemetry
  debugName?: string
}

type ChordBinding = CommandBindingBase & {
  type: 'chord'
  keys: KeyToken[] // must contain exactly 1 non-modifier “main key”
}

type SequenceBinding = CommandBindingBase & {
  type: 'sequence'
  keys: string[] // ordered list of keys (usually no modifiers)
  timeoutMs?: number // overrides instance default
}

type CommandBinding = ChordBinding | SequenceBinding
```

### Key normalization

- Match against `event.key` (not `code`) unless explicitly changed in a future revision.
- Normalize `event.key` to lowercase for matching (e.g. `A` → `a`).
- Optional normalization for aliases:
  - `Esc` → `Escape`
  - (implementation-defined) others as needed.

### `mod` handling

The `mod` key is automatically resolved based on the detected platform:

- macOS → `meta` (Cmd key)
- Other platforms (Windows, Linux, etc.) → `ctrl`

For testing, you can override the platform detection using the `platform` option.

---

## Layers and Activity

### Layer kinds

This spec defines conventional layer roles; they are implemented via named layers.

- **Global layer**: always present and generally always active.
- **Mode layer**: the current editor/tool mode (only one at a time).
- **Modal layers**: stack of layers pushed/popped; can be exclusive.

### Layer naming convention (recommended)

- Global: `"global"`
- Mode: `"mode:<name>"` (e.g. `"mode:canvas"`)
- Modals: `"modal:<name>"` (e.g. `"modal:settings"`)

These are conventions; the API accepts arbitrary names.

### Modal exclusivity

If there is at least one **exclusive** modal layer on the stack:

- Active layers are:
  - the modal stack (top-to-bottom)
  - plus global (configurable via `includeGlobalDuringExclusiveModal`)
- Mode layers are **inactive** while an exclusive modal is present.

If there are modal layers but none exclusive:

- modal layers overlay on top of mode layer(s)
- global remains active

### Precedence order

When evaluating a keydown:

1. Topmost modal layer (last pushed)
2. Next modal layer…
3. Current mode layer (if not blocked by exclusivity)
4. Global layer (if included)
   Within a layer:

- Chords are checked before sequences.

---

## Event Filtering

### Disabled state

If `commands.setEnabled(false)`, all keyboard handling is skipped.

### Editable targets

If `blockOnEditableTarget` is true (default), ignore key events when:

- target is `<input>` or `<textarea>`
- or target is `contenteditable`
  unless the binding has `allowInEditableTarget: true`.

### Repeats

If `allowRepeat` is false (default), ignore `event.repeat === true`.

### IME/composition (recommended)

Implementations SHOULD ignore events where:

- `event.isComposing === true`
- or `event.key === 'Process'`
  to reduce interference with IME input.

---

## Sequence State Machine (Reducer)

### State

The Commands instance maintains a small reducer-driven state:

```ts
type SequenceState =
  | {kind: 'idle'}
  | {
      kind: 'active'
      buffer: string[]
      deadline: number
      candidates: Candidate[] // narrowed as keys arrive
    }

type Candidate = {
  binding: SequenceBinding
  layerName: string
  priority: number
}
```

### Actions

```ts
type Action =
  | {type: 'sequence/reset'}
  | {type: 'sequence/key'; key: string; now: number; active: Candidate[]}
```

### Reducer rules (simple, deterministic)

- If `now > deadline`: reset to idle.
- When idle:
  - receiving a key computes candidate sequences whose first key matches.
  - if none: remain idle.
  - else enter active with buffer `[key]` and deadline `now + timeout`.
- When active:
  - append key to buffer
  - filter candidates where `buffer` remains a prefix of `candidate.binding.keys`
  - if candidates empty: reset to idle
  - if one or more candidates are now complete:
    - choose the **highest priority** complete candidate (see below)
    - execute it once
    - reset to idle
  - otherwise remain active until deadline or mismatch

### Candidate priority

Priority is derived from layer precedence:

- higher precedence layer → higher priority
- within same layer, earlier registration order wins (stable)

### Modifier rule for sequences

Sequences are matched only when no modifiers are held:

- if `ctrl/meta/alt/shift` is pressed at any step:
  - reset sequence and do not start/advance

---

## Chord Matching

A chord binding must have:

- zero or more modifier tokens
- exactly one non-modifier “main key” token

Matching rules:

- Required modifiers must be pressed.
- Modifiers not listed must NOT be pressed (exact match).
- Main key must match `normalize(event.key)`.

---

## Execution

### Runner

The Commands instance delegates actual execution to a runner function:

```ts
commands.setRunner((id, ctx) => { ... })
```

Default runner behavior (if none set):

- no-op (or throw in dev builds, implementation-defined)

### Running from keyboard

When a binding matches:

- if `preventDefault` is true (default): call `event.preventDefault()`
- if `stopPropagation` is true: call `event.stopPropagation()`
- call `commands.run(id, { event, source: 'keyboard' })`

### Running from palette

Command palette uses the same runner:

```ts
commands.run(id, {source: 'palette'})
```

---

## Dynamic Registration

### Register functions

`registerGlobal`, `setModeLayer`, `pushModal`, `registerLayer` all:

- update the internal registry
- reset any active sequence state
- notify subscribers of active bindings
- return an `Unregister` function that reverses that exact registration

### setModeLayer semantics

- Replaces the previous mode layer entirely.
- Calling the returned unregister clears that mode layer only if it is still the current one.

### pushModal semantics

- Pushes a modal layer onto a stack.
- Unregister pops that exact modal instance (LIFO recommended). If called out of order, behavior is implementation-defined but SHOULD remove the matching modal by identity.

### setLayerEnabled

Disables/reenables a layer without removing its bindings.
Disabling a layer:

- resets any active sequence
- triggers subscriber notification

---

## Observation for Command Palette

The Commands instance must expose a computed view of currently active bindings.

### ActiveBinding

```ts
type ActiveBinding = {
  id: CommandId
  type: 'chord' | 'sequence'
  keys: string[] // normalized tokens/keys
  display: string // formatted string for UI (implementation-defined)
  layer: string // layer name
  priority: number // higher = more precedence
}
```

### getActiveBindings()

Returns the list of active bindings **as of now**, based on:

- layer stack and enabled flags
- modal exclusivity rules

The returned list:

- MUST be stable ordered by `priority` desc, then registration order.
- MAY include multiple entries with same `id` (a command with multiple bindings).

### subscribe(listener)

- Adds `listener` to an internal set
- Immediately calls `listener(getActiveBindings())`
- Returns an unsubscribe function
- Listener is called whenever:
  - any layer is registered/unregistered
  - any layer enabled flag changes
  - exclusivity stack changes
  - global enabled flag changes

---

## Formatting Keys for Display

A helper SHOULD exist to format `keys` for the UI:

- macOS:
  - `meta` → `⌘`
  - `shift` → `⇧`
  - `alt` → `⌥`
  - `ctrl` → `⌃`
- Windows/Linux:
  - `ctrl` → `Ctrl`
  - `alt` → `Alt`
  - `shift` → `Shift`
  - `meta` → `Win` (or `Meta`)

Sequences should display with a separator (recommended: space):

- `['g','h']` → `"G H"` or `"g h"`

Chords should display with a plus-like separator:

- `['mod','=']` → `"⌘ ="` or `"Ctrl ="`

Exact formatting is implementation-defined but MUST be consistent.

---

## Example Usage

```ts
import {createCommands} from './lib/commands'

const commands = createCommands()

commands.setRunner((id, ctx) => {
  switch (id) {
    case 'zoom.reset':
      setZoom(1)
      break
    case 'zoom.in':
      setZoom((z) => z + 1)
      break
    case 'zoom.out':
      setZoom((z) => z - 1)
      break
    case 'viewport.prev':
      setViewport((v) => v - 1)
      break
    case 'viewport.next':
      setViewport((v) => v + 1)
      break
    case 'nav.home':
      navigate('/')
      break
  }
})

// Global commands
const unregGlobal = commands.registerGlobal([
  {id: 'palette.open', type: 'chord', keys: ['mod', 'k']},
  {id: 'modal.close', type: 'chord', keys: ['escape']},
])

// Mode commands (canvas)
const unregMode = commands.setModeLayer('canvas', [
  {id: 'zoom.reset', type: 'chord', keys: ['mod', '0']},
  {id: 'zoom.out', type: 'chord', keys: ['mod', '-']},
  {id: 'zoom.in', type: 'chord', keys: ['mod', '=']},
  {id: 'viewport.prev', type: 'chord', keys: ['mod', '[']},
  {id: 'viewport.next', type: 'chord', keys: ['mod', ']']},
  {id: 'nav.home', type: 'sequence', keys: ['g', 'h']},
])

// Modal (exclusive)
const popSettings = commands.pushModal(
  'settings',
  [
    {id: 'settings.save', type: 'chord', keys: ['mod', 'enter']},
    {id: 'modal.close', type: 'chord', keys: ['escape']},
  ],
  {exclusive: true},
)

// Command palette data
const unsub = commands.subscribe((active) => {
  // join with your command metadata registry and render
  console.log(active)
})

// cleanup
popSettings()
unregMode()
unregGlobal()
unsub()
commands.unsubscribe()
```

---

## Implementation Notes (recommended, not required)

- Precompile chord bindings into a normalized shape for fast matching.
- Reset sequence state whenever active layers change (register/unregister/enable changes).
- Prefer `event.key` over `event.code` for expected user-facing behavior, unless you explicitly want physical-key bindings.

---

## Acceptance Criteria

1. A single `keydown` listener is mounted at instance creation and removed by `unsubscribe()`.
2. Bindings can be registered/unregistered dynamically without remounting the listener.
3. Modal layers can be exclusive and disable parent mode layer bindings.
4. Active bindings can be observed via `subscribe()` and retrieved via `getActiveBindings()`.
5. Chords match with exact modifier rules and a single main key.
6. Sequences use a reducer-driven state machine with timeout and candidate narrowing.
7. Chords take precedence over sequences within the same active layer.
