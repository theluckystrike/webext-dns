# webext-dns

[![npm version](https://img.shields.io/npm/v/webext-dns.svg)](https://www.npmjs.com/package/webext-dns)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last commit](https://img.shields.io/github/last-commit/theluckystrike/webext-dns)](https://github.com/theluckystrike/webext-dns/commits/main)

A TypeScript-friendly wrapper for the Chrome DNS API. Simplify hostname resolution in your Chrome extensions with a clean, promise-based API.

## Features

- **Promise-based API** — Native async/await support
- **TypeScript native** — Full type definitions included
- **Multiple resolution methods** — Resolve single or multiple hostnames
- **Lightweight** — Zero external dependencies

## Installation

```bash
npm install webext-dns
```

## Requirements

- Chrome (or Chromium-based browser) extension
- `"dns"` permission in your `manifest.json`

```json
{
  "permissions": [
    "dns"
  ]
}
```

## Usage

```typescript
import { DNS } from 'webext-dns';

// Resolve a hostname to an IP address
try {
  const address = await DNS.resolve('example.com');
  console.log('IP address:', address);
} catch (error) {
  console.error('Failed to resolve:', error.message);
}

// Check if a hostname can be resolved
const canResolve = await DNS.canResolve('google.com');
if (canResolve) {
  console.log('Hostname is resolvable');
}

// Resolve multiple hostnames in parallel
const results = await DNS.resolveMany(['google.com', 'github.com', 'invalid.test']);
console.log(results);
// {
//   'google.com': '142.250.185.46',
//   'github.com': '140.82.121.4',
//   'invalid.test': null
// }
```

## API Reference

### `DNS.resolve(hostname: string): Promise<string>`

Resolves a hostname into an IP address.

- **Parameters:**
  - `hostname` (string): The hostname to resolve
- **Returns:** `Promise<string>` — The resolved IP address
- **Throws:** Error if resolution fails or Chrome DNS API is unavailable

### `DNS.canResolve(hostname: string): Promise<boolean>`

Checks if a hostname can be resolved without throwing an error.

- **Parameters:**
  - `hostname` (string): The hostname to check
- **Returns:** `Promise<boolean>` — True if resolvable, false otherwise

### `DNS.resolveMany(hostnames: string[]): Promise<Record<string, string | null>>`

Resolves multiple hostnames in parallel.

- **Parameters:**
  - `hostnames` (string[]): Array of hostnames to resolve
- **Returns:** `Promise<Record<string, string | null>>` — Object mapping hostnames to their IP addresses (or null if resolution failed)

## Project Structure

```
webext-dns/
├── src/
│   ├── index.ts        # Main source code
│   └── index.test.ts   # Test suite
├── LICENSE             # MIT License
├── package.json        # NPM package configuration
├── tsconfig.json       # TypeScript configuration
└── README.md          # This file
```

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
