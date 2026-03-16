# Migration Guide: v2 to v3

This guide helps you upgrade from `@sanity/ui` v2 to v3.

## Overview

Version 3.0.0 of `@sanity/ui` includes important dependency upgrades that address security vulnerabilities and modernize the codebase. Most applications will require minimal changes.

## Breaking Changes

### 1. Node.js Version Requirement

**v2:** Node.js >= 14.0.0  
**v3:** Node.js >= 20.19.0 in the 20.x series, or >= 22.12.0 in the 22.x series

> **Note**: Node.js versions 22.0 through 22.11 are not supported. If using Node.js 22, you must be on version 22.12 or later.

**Action Required:**
- Upgrade your Node.js version to meet the v3 requirements. We recommend using the latest LTS version

```bash
# Check your current Node.js version
node --version

# If below 20.19, upgrade Node.js first
```

### 2. Refractor and react-refractor Upgrades

The `refractor` and `react-refractor` dependencies have been upgraded to address [CVE-2024-53382](https://github.com/advisories/GHSA-x7hr-w5r2-h6wg).

**Dependency versions:**
- `refractor`: 4.9.0 → 5.0.0
- `react-refractor`: 2.2.0 → 4.0.0

#### If you're using the Code component

If you're only using the built-in `Code` component from `@sanity/ui`, **no changes are required**. The internal implementation has been updated to work with the new versions.

#### If you're using react-refractor directly

If your application imports and uses `react-refractor` or `refractor` directly, you'll need to update your code.

**Import Changes:**

```diff
// Before (v2)
-import Refractor from 'react-refractor'
-import javascript from 'refractor/lang/javascript'
-
-Refractor.registerLanguage(javascript)
-const registered = Refractor.hasLanguage('javascript')

// After (v3)
+import {Refractor, registerLanguage, hasLanguage} from 'react-refractor'
+import javascript from 'refractor/javascript'
+
+registerLanguage(javascript)
+const registered = hasLanguage('javascript')
```

**Key Changes:**
1. **Named imports**: `Refractor` is now a named export, not a default export
2. **Language path**: Language imports changed from `refractor/lang/[name]` to `refractor/[name]`
3. **Separate functions**: `registerLanguage` and `hasLanguage` are now separate exports, not methods on `Refractor`

**Complete Example:**

```tsx
// Before (v2)
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)

function MyComponent() {
  return <Refractor language="javascript" value={`const x = 1;`} />
}
```

```tsx
// After (v3)
import {Refractor, registerLanguage} from 'react-refractor'
import javascript from 'refractor/javascript'
import json from 'refractor/json'

registerLanguage(javascript)
registerLanguage(json)

function MyComponent() {
  return <Refractor language="javascript" value={`const x = 1;`} />
}
```

## Upgrade Steps

1. **Verify Node.js version:**
   ```bash
   node --version  # Should be >= 20.19.0 (20.x series) or >= 22.12.0 (22.x series)
   ```

2. **Update @sanity/ui:**
   ```bash
   npm install @sanity/ui@^3.0.0
   # or
   yarn add @sanity/ui@^3.0.0
   # or
   pnpm add @sanity/ui@^3.0.0
   ```

3. **Update your code** (only if you use `react-refractor` or `refractor` directly):
   - Update imports to use named exports
   - Update language import paths
   - Update API calls to use standalone functions

4. **Test your application:**
   - Pay special attention to any code syntax highlighting features
   - Verify that all registered languages still work correctly

## Need Help?

If you encounter issues during the upgrade:

1. Check the [changelog](./CHANGELOG.md) for detailed release notes
2. Review the [refractor 5.0.0 release notes](https://github.com/wooorm/refractor/releases/tag/5.0.0)
3. Review the [react-refractor 4.0.0 release notes](https://github.com/rexxars/react-refractor/releases/tag/v4.0.0)
4. [Open an issue](https://github.com/sanity-io/ui/issues/new) on GitHub

## Benefits of Upgrading

- **Security**: Addresses CVE-2024-53382 in the Prism dependency
- **Modern Node.js**: Takes advantage of newer Node.js features and improved performance
- **Updated dependencies**: Ensures compatibility with the latest ecosystem tools
