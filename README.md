# webext-dns

<div align="center">

[![npm version](https://img.shields.io/npm/v/webext-dns.svg)](https://www.npmjs.com/package/webext-dns)
[![npm downloads](https://img.shields.io/npm/dm/webext-dns.svg)](https://www.npmjs.com/package/webext-dns)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/npm/l/webext-dns.svg)](LICENSE)

</div>

Typed DNS resolution helpers for Chrome extensions — resolve hostnames, batch lookups, and caching. Part of [@zovo/webext](https://github.com/theluckystrike/webext).

## Features

- **Type-safe DNS resolution** — Full TypeScript support with typed return values
- **Batch resolution** — Resolve multiple hostnames in parallel
- **Error handling** — Graceful handling of resolution failures
- **Chrome API integration** — Direct wrapper around the Chrome `dns` API
- **Lightweight** — Zero runtime dependencies

## Installation

```bash
npm install webext-dns
```

or with pnpm:

```bash
pnpm add webext-dns
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

### Check Resolution Capability

Check if a hostname can be resolved without throwing an error:

```typescript
import { DNS } from 'webext-dns';

const canResolve = await DNS.canResolve('google.com');
if (canResolve) {
  console.log('google.com is resolvable');
} else {
  console.log('google.com cannot be resolved');
}
```

### Batch Resolution

Resolve multiple hostnames efficiently in parallel:

```typescript
import { DNS } from 'webext-dns';

const results = await DNS.resolveMany([
  'google.com',
  'github.com',
  'example.com',
]);

console.log(results);
// Output:
// {
//   google.com: '142.250.185.14',
//   github.com: '140.82.121.4',
//   example.com: '93.184.216.34'
// }

// Failed resolutions are null
const mixed = await DNS.resolveMany(['valid.com', 'invalid..test']);
// { valid.com: '93.184.216.34', invalid..test: null }
```

### Using in a Chrome Extension

Add the `dns` permission to your `manifest.json`:

```json
{
  "permissions": [
    "dns"
  ]
}
```

Then use in your extension code:

```typescript
import { DNS } from 'webext-dns';

// In your background script or service worker
async function checkConnectivity(hostname: string) {
  const canConnect = await DNS.canResolve(hostname);
  return canConnect;
}

// Batch check multiple domains
async function getServerIPs(domains: string[]) {
  const ips = await DNS.resolveMany(domains);
  return ips;
}
```

## API

| Method | Description | Returns |
|--------|-------------|---------|
| `DNS.resolve(hostname)` | Resolves a hostname to an IP address | `Promise<string>` |
| `DNS.canResolve(hostname)` | Checks if a hostname can be resolved | `Promise<boolean>` |
| `DNS.resolveMany(hostnames)` | Resolves multiple hostnames in parallel | `Promise<Record<string, string \| null>>` |

### `DNS.resolve(hostname)`

Resolves a hostname into an IP address.

- **hostname** (`string`): The hostname to resolve
- **Returns**: `Promise<string>` - The resolved IP address
- **Throws**: `Error` if resolution fails

### `DNS.canResolve(hostname)`

Checks if a hostname can be resolved without throwing an error.

- **hostname** (`string`): The hostname to check
- **Returns**: `Promise<boolean>` - `true` if resolvable, `false` otherwise

### `DNS.resolveMany(hostnames)`

Resolves multiple hostnames in parallel for efficient batch operations.

- **hostnames** (`string[]`): Array of hostnames to resolve
- **Returns**: `Promise<Record<string, string | null>>` - Object with hostnames as keys and IP addresses (or `null` for failed resolutions) as values

## Permissions

This library requires the `dns` permission in your Chrome extension's `manifest.json`:

```json
{
  "permissions": [
    "dns"
  ]
}
```

## Browser Support

- **Chrome** (Manifest V3) — Full support
- **Edge** (Chromium-based) — Full support
- **Opera** — Full support
- **Other browsers** — Not supported (the `chrome.dns` API is Chrome-specific)

> **Note**: The DNS API is only available in extension context (background scripts, service workers) and requires the `dns` permission.

## Part of @zovo/webext

`webext-dns` is part of the `@zovo/webext` collection of TypeScript utilities for Chrome extension development.

<div align="center">

**[View all @zovo/webext packages →](https://github.com/theluckystrike/webext)**

</div>

---

<div align="center">

Made with ⚡ by <a href="https://zovo.one">Zovo</a>

</div>
