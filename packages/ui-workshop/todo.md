# Commands System Refactoring - Implementation Plan

> **Context**: Refactoring the keyboard commands system to provide first-class React hooks that are performant, type-safe, and feel idiomatic.

## 🎯 Goals

1. Fix race conditions in current React integration
2. Provide hook-based API that prevents common mistakes
3. Add type-safe command handling
4. Make iframe integration automatic via Context
5. Improve developer experience and testability

---

## 📋 Phase 1: Fix Critical Issues (Priority: HIGH)

### 1.1 Create `CommandsProvider` Context

**Problem**:

- No centralized Commands instance management
- Platform override uses window global hack
- Difficult to share Commands across component tree

**Solution**:

```typescript
// src/core/lib/commands/CommandsProvider.tsx
interface CommandsContextValue {
  commands: Commands
  platform?: 'mac' | 'other'
}

export const CommandsProvider: React.FC<{
  children: React.ReactNode
  platform?: 'mac' | 'other'
  // other CreateCommandsOptions
}>
```

**Implementation**:

- Create Context with Commands instance
- Initialize once at provider level
- Cleanup on unmount
- Forward all CreateCommandsOptions as props

**Testing**:

- Provider mounts/unmounts cleanly
- Context is accessible to children
- Platform override works without window hack

**Decision Points**:

- Should provider support multiple instances (nested providers)?
- Should we allow dynamic reconfiguration or lock on mount?

---

### 1.2 Create `useCommands` Hook

**Problem**:

- Components manually manage commandsRef
- No standard way to access Commands instance

**Solution**:

```typescript
// src/core/lib/commands/useCommands.ts
export function useCommands(): Commands {
  const context = useContext(CommandsContext)
  if (!context) {
    throw new Error('useCommands must be used within CommandsProvider')
  }
  return context.commands
}
```

**Implementation**:

- Simple context accessor
- Throw helpful error if outside provider
- No additional logic needed

**Testing**:

- Hook works inside provider
- Throws error outside provider
- Returns stable Commands instance

---

### 1.3 Fix Race Condition: Unified Registration + Handler

**Problem** (Workshop.tsx:190-265):

```typescript
// ❌ Commands registered in one effect, runner in another
useEffect(() => {
  commands.registerGlobal([...]) // Registered here
}, [])

useEffect(() => {
  commands.setRunner((id) => {...}) // Runner set here - RACE!
}, [zoom, viewport, ...])
```

**Root Cause**:

- Commands can execute between registration and runner setup
- Runner captures stale closures when deps change
- Manual switch statement has no exhaustiveness checking

**Solution**: Create `useCommandBindings` hook

```typescript
// src/core/lib/commands/useCommandBindings.ts
interface CommandHandler<TPayload = void> {
  id: string
  keys: KeyToken[]
  handler: (ctx: RunContext) => void
  // ... other binding options (preventDefault, allowRepeat, etc.)
}

export function useCommandBindings(bindings: CommandHandler[], deps?: DependencyList): void
```

**Implementation Approach**:

1. Accept array of bindings with handlers inline
2. Register bindings + set runner in single effect
3. Cleanup on unmount or when bindings change
4. Use stable command IDs to prevent unnecessary re-registration

**Key Design Decision** 🤔:

```typescript
// Option A: Handlers in binding definition
useCommandBindings([{id: 'zoom.in', keys: ['mod', '='], handler: () => zoomIn()}])

// Option B: Separate registration + runner (like current)
useCommandBindings([{id: 'zoom.in', keys: ['mod', '=']}], {
  'zoom.in': () => zoomIn(),
})
```

**Recommendation**: Option A (handlers inline)

- ✅ No race conditions possible
- ✅ Impossible to forget handler for a binding
- ✅ Co-located definition
- ✅ TypeScript can enforce handler exists

**Implementation Details**:

```typescript
export function useCommandBindings(bindings: CommandHandler[], deps?: DependencyList): void {
  const commands = useCommands()

  useEffect(
    () => {
      // Register all bindings
      const unregister = commands.registerGlobal(
        bindings.map((b) => ({
          type: 'chord',
          id: b.id,
          keys: b.keys,
          preventDefault: b.preventDefault,
          allowRepeat: b.allowRepeat,
          // ... other options
        })),
      )

      // Set runner that maps id -> handler
      const handlerMap = new Map(bindings.map((b) => [b.id, b.handler]))
      commands.setRunner((id, ctx) => {
        const handler = handlerMap.get(id)
        if (handler) handler(ctx)
      })

      return unregister
    },
    deps || [bindings],
  )
}
```

**Testing**:

- Bindings register and execute correctly
- Cleanup unregisters properly
- Handler receives correct context
- No race conditions with rapid re-registrations
- Deps array works correctly

**Decision Points**:

- Should we auto-memoize if deps not provided?
- Should we warn if bindings array isn't stable?
- How to handle sequence bindings vs chord bindings?

---

### 1.4 Type-Safe Command Map

**Problem**:

```typescript
// ❌ No type safety
commands.setRunner((id) => {
  // id is just `string`
  switch (id) {
    case 'zoom.in':
      break
    case 'zom.in':
      break // Typo! No error
  }
})
```

**Solution**: Generic type parameter for command IDs

```typescript
// Define command map type
type AppCommands =
  | 'zoom.in'
  | 'zoom.out'
  | 'zoom.reset'
  | 'navigator.toggle'
  | 'inspector.toggle'

// Type-safe usage
useCommandBindings<AppCommands>([
  { id: 'zoom.in', ... },    // ✅ OK
  { id: 'zom.in', ... },     // ❌ Type error
])
```

**Implementation**:

1. Make `CommandId` generic in types.ts
2. Update all related types to flow generics through
3. Update `useCommandBindings` signature
4. Update tests to verify type safety

**Testing**:

- TypeScript compilation catches typos
- Autocomplete works for command IDs
- Type inference works correctly

**Decision Points**:

- Should we generate types from bindings automatically?
- Use string literals vs branded types?

---

### 1.5 Refactor Workshop.tsx to Use New Hooks

**Current** (Workshop.tsx:190-265): ~75 lines of boilerplate
**Target**: ~20 lines with hooks

```typescript
// After refactoring
function Workshop(props: WorkshopProps) {
  // ... existing state

  const handleZoomIn = useCallback(() => {
    const currentIndex = ZOOM_OPTIONS.findIndex((o) => o.value === zoom)
    const nextIndex = Math.min(currentIndex + 1, ZOOM_OPTIONS.length - 1)
    broadcast({type: 'workshop/setZoom', value: ZOOM_OPTIONS[nextIndex].value})
  }, [zoom, broadcast])

  // Similar for other handlers...

  useCommandBindings([
    {
      id: 'zoom.reset',
      keys: ['mod', '0'],
      handler: () => broadcast({type: 'workshop/setZoom', value: 1}),
    },
    {id: 'zoom.in', keys: ['mod', '='], handler: handleZoomIn},
    {id: 'zoom.out', keys: ['mod', '-'], handler: handleZoomOut},
    {id: 'viewport.next', keys: ['mod', '['], handler: handleViewportNext},
    {id: 'viewport.prev', keys: ['mod', ']'], handler: handleViewportPrev},
    {id: 'navigator.toggle', keys: ['mod', '\\'], handler: handleNavigatorToggle},
    {id: 'inspector.toggle', keys: ['mod', 'i'], handler: handleInspectorToggle},
    {
      id: 'nav.home',
      keys: ['g', 'h'],
      handler: () => broadcast({type: 'workshop/setPath', value: '/'}),
    },
  ])

  // ... rest of component
}
```

**Implementation Steps**:

1. Wrap App with `<CommandsProvider>`
2. Replace command setup effects with `useCommandBindings`
3. Remove commandsRef, manual registration code
4. Keep iframe integration for now (will improve in Phase 2)

**Testing**:

- All keyboard shortcuts still work
- E2E tests pass
- No regressions in functionality

---

## 📋 Phase 2: Improve Developer Experience (Priority: MEDIUM)

### 2.1 Automatic Iframe Integration

**Problem** (Workshop.tsx:282-314):

- Manual iframe ref tracking
- Complex useEffect for load timing
- Bespoke solution not reusable

**Solution**: Context automatically tracks iframes

```typescript
// src/core/lib/commands/CommandsProvider.tsx
export function useCommandTarget(target: Window | Document | null): void {
  const commands = useCommands()

  useEffect(() => {
    if (!target) return
    return commands.addTarget(target)
  }, [commands, target])
}

// Usage in Workshop.tsx
const frameRef = useRef<HTMLIFrameElement>(null)
const frameWindow = frameRef.current?.contentWindow

useCommandTarget(frameWindow) // That's it!
```

**Implementation**:

- Create `useCommandTarget` hook
- Handle load timing automatically
- Support multiple targets
- Auto cleanup on unmount

**Testing**:

- Iframe shortcuts work
- Cleanup happens correctly
- Multiple iframes supported
- E2E tests still pass

---

### 2.2 Layer Management Hooks

**Current**: Manual layer registration
**Better**: Declarative hooks

```typescript
// For modal layers
export function useCommandLayer(
  name: string,
  bindings: CommandHandler[],
  options?: { exclusive?: boolean }
): void

// Usage
function Modal({ isOpen }) {
  useCommandLayer('modal', [
    { id: 'modal.close', keys: ['escape'], handler: onClose }
  ], { exclusive: true })

  if (!isOpen) return null
  return <div>...</div>
}
```

**Implementation**:

- Wrap `pushModal` / `registerLayer`
- Auto cleanup when component unmounts
- Support conditional rendering

**Testing**:

- Layer priority works correctly
- Exclusive layers block global commands
- Cleanup works on unmount

---

### 2.3 Helper Utilities

Create convenience hooks for common patterns:

```typescript
// For debugging
export function useCommandDebug(): void {
  const commands = useCommands()
  useEffect(() => {
    const unsubscribe = commands.subscribe((bindings) => {
      console.log('Active bindings:', bindings)
    })
    return unsubscribe
  }, [commands])
}

// For getting active bindings (command palette)
export function useActiveCommands(): ActiveBinding[] {
  const commands = useCommands()
  const [bindings, setBindings] = useState<ActiveBinding[]>([])

  useEffect(() => {
    return commands.subscribe(setBindings)
  }, [commands])

  return bindings
}
```

---

## 📋 Phase 3: Polish & Documentation (Priority: LOW)

### 3.1 Command Palette Integration

Create hooks specifically for command palette UI:

```typescript
export function useCommandPalette() {
  const commands = useCommands()
  const bindings = useActiveCommands()

  const execute = useCallback(
    (id: string) => {
      commands.run(id, {source: 'palette'})
    },
    [commands],
  )

  return {bindings, execute}
}
```

---

### 3.2 DevTools Support

Add development-only debugging features:

```typescript
// Log all command executions
if (process.env.NODE_ENV === 'development') {
  commands.subscribe((bindings) => {
    console.group('Commands Changed')
    console.table(bindings)
    console.groupEnd()
  })
}
```

---

### 3.3 Documentation

Update docs to show:

- Hook-based API examples
- Migration guide from old API
- Common patterns and recipes
- TypeScript usage

---

## 🧪 Testing Strategy

### Unit Tests

- [ ] CommandsProvider renders and cleans up
- [ ] useCommands throws outside provider
- [ ] useCommandBindings registers/unregisters correctly
- [ ] Race conditions prevented
- [ ] Type safety enforced

### Integration Tests

- [ ] Multiple hooks in same component
- [ ] Nested layers work correctly
- [ ] Iframe integration automatic
- [ ] Dynamic binding updates

### E2E Tests

- [ ] All existing keyboard shortcuts work
- [ ] No regressions in Workshop.tsx
- [ ] Platform override for testing works

---

## 🚀 Rollout Plan

1. **Phase 1 (Critical)** - Complete before merging
2. **Phase 2 (DX)** - Can be follow-up PR
3. **Phase 3 (Polish)** - Nice-to-have, iterative

---

## ✅ FINAL API DECISIONS

1. **Naming**:
   - `useCommands([...])` - Register commands with handlers
   - `useCommandController()` - Get Commands instance (advanced use)

2. **No deps array**: Users control via `useMemo`/`useCallback`

3. **Internal `useUnique` hook**: Shallow equality check to prevent unnecessary re-registration

4. **Explicit `type` property**: Each command has `type: 'chord' | 'sequence'`

5. **Remove `setRunner`**:
   - Handlers inline with bindings
   - IDs must be unique globally
   - Warn/fail on duplicate IDs
   - Refactor `createCommands` internals to manage handler map

## ❓ Open Questions for Review

1. **Type-safe command IDs**: Use string union or branded types?
2. **Multiple providers**: Support nested CommandsProviders or single global?
3. **Breaking changes**: OK to break Workshop.tsx, or need backwards compat layer?

---

## 📝 Notes

- Keep vanilla JS `createCommands` unchanged (it's solid)
- React layer is thin wrapper over core
- All improvements are additive (no breaking changes to core)
- Can ship Phase 1 independently of Phase 2/3
