# webext-dns

[![npm version](https://img.shields.io/npm/v/webext-dns.svg)](https://www.npmjs.com/package/webext-dns)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js >=18](https://img.shields.io/badge/Node.js->=18-339933?logo=node.js)](https://nodejs.org)

Typed DNS resolution helpers for Chrome extensions — resolve hostnames, batch lookups, and caching. Part of [@zovo/webext](https://github.com/zovojs).

## Features

- **Simple DNS Resolution** — Resolve hostnames to IP addresses with a clean, typed API
- **Built-in Caching** — Automatic caching with 5-minute TTL for improved performance
- **Batch Lookups** — Resolve multiple hostnames in parallel with `resolveMany()`
- **TypeScript First** — Full type safety with TypeScript definitions included
- **Error Handling** — Consistent error handling with descriptive error messages
- **Chrome API** — Built on top of the Chrome `dns` permission API

## Installation

```bash
npm install webext-dns
```

Or using pnpm:

```bash
pnpm add webext-dns
```

## Requirements

- Chrome extensions targeting Manifest V3
- The `dns` permission in your `manifest.json`:

```json
{
  "permissions": [
    "dns"
  ]
}
```

## Usage

### Basic Resolution

Resolve a single hostname to an IP address:

```typescript
import { DNS } from 'webext-dns';

try {
  const address = await DNS.resolve('example.com');
  console.log('IP address:', address);
  // Output: IP address: 93.184.216.34
} catch (error) {
  console.error('Failed to resolve:', error.message);
}
```

### Check if Resolvable

Check if a hostname can be resolved without throwing an error:

```typescript
const canResolve = await DNS.canResolve('google.com');

if (canResolve) {
  console.log('google.com can be resolved!');
} else {
  console.log('Unable to resolve google.com');
}
```

### Batch Resolution

Resolve multiple hostnames in parallel:

```typescript
const results = await DNS.resolveMany([
  'google.com',
  'github.com',
  'example.com'
]);

console.log(results);
// Output:
// {
//   'google.com': '142.250.185.78',
//   'github.com': '140.82.121.3',
//   'example.com': '93.184.216.34'
// }

// Failed resolutions return null:
const mixed = await DNS.resolveMany([
  'valid-domain.com',
  'this-does-not-exist.invalid'
]);

console.log(mixed);
// Output:
// {
//   'valid-domain.com': '1.2.3.4',
//   'this-does-not-exist.invalid': null
// }
```

### Error Handling

The library provides descriptive error messages:

```typescript
try {
  await DNS.resolve('invalid..hostname');
} catch (error) {
  console.error(error.message);
  // Output: Failed to resolve hostname: invalid..hostname (Result code: 1)
}
```

### Clearing the Cache

The library includes built-in caching with a 5-minute TTL. You can manually clear the cache if needed:

```typescript
// Clear all cached DNS resolutions
DNS.clearCache();
console.log('DNS cache cleared');
```

## API

### `DNS.resolve(hostname: string): Promise<string>`

Resolves a hostname into an IP address.

| Parameter | Type | Description |
|-----------|------|-------------|
| `hostname` | `string` | The hostname to resolve |

**Returns:** `Promise<string>` — The resolved IP address

**Throws:** `Error` if resolution fails

**Caching:** Results are automatically cached for 5 minutes

---

### `DNS.canResolve(hostname: string): Promise<boolean>`

Checks if a hostname can be resolved without throwing.

| Parameter | Type | Description |
|-----------|------|-------------|
| `hostname` | `string` | The hostname to check |

**Returns:** `Promise<boolean>` — `true` if resolvable, `false` otherwise

---

### `DNS.resolveMany(hostnames: string[]): Promise<Record<string, string | null>>`

Resolves multiple hostnames in parallel.

| Parameter | Type | Description |
|-----------|------|-------------|
| `hostnames` | `string[]` | Array of hostnames to resolve |

**Returns:** `Promise<Record<string, string | null>>` — Object mapping hostnames to IP addresses (or `null` if resolution failed)

---

### `DNS.clearCache(): void`

Clears all cached DNS resolution results.

**Returns:** `void`

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Edge | ✅ Full support (Chromium-based) |
| Opera | ✅ Full support (Chromium-based) |
| Firefox | ❌ Not supported |
| Safari | ❌ Not supported |

> **Note:** The Chrome DNS API (`chrome.dns`) is only available in Chrome extensions with the `dns` permission. This library will throw an error if used outside of a Chrome extension context.

## Part of @zovo/webext

webext-dns is part of the @zovo/webext collection of utilities for building Chrome extensions:

- [webext-dns](https://github.com/theluckystrike/webext-dns) — DNS resolution helpers
- [webext-storage](https://github.com/theluckystrike/webext-storage) — Typed storage utilities
- [webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe messaging

## License

MIT © [theluckystrike](https://github.com/theluckystrike)

---

<p align="center">
  <a href="https://zovo.one">
    <img src="https://zovo.one/logo.svg" width="30" height="30" alt="Zovo" />
  </a>
</p>
<p align="center">
  Part of <a href="https://zovo.one">Zovo</a>
</p>
