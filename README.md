<div align="center">

# webext-dns

Typed DNS resolution helpers for Chrome extensions. Resolve hostnames, check reachability, and batch-resolve with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/webext-dns)](https://www.npmjs.com/package/webext-dns)
[![npm downloads](https://img.shields.io/npm/dm/webext-dns)](https://www.npmjs.com/package/webext-dns)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/webext-dns)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Resolve hostnames** -- get IP addresses for any hostname
- **Reachability check** -- test if a hostname can be resolved
- **Batch resolution** -- resolve multiple hostnames in parallel
- **Typed** -- full TypeScript return types
- **Promise-based** -- async/await for all operations
- **Error handling** -- clear errors when resolution fails

## Installation

```bash
npm install webext-dns
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add webext-dns
# or
yarn add webext-dns
```

</details>

## Quick Start

```typescript
import { DNS } from "webext-dns";

const ip = await DNS.resolve("example.com");
const canResolve = await DNS.canResolve("google.com");
const results = await DNS.resolveMany(["google.com", "github.com"]);
```

## API

| Method | Description |
|--------|-------------|
| `resolve(hostname)` | Resolve a hostname to an IP address |
| `canResolve(hostname)` | Check if a hostname can be resolved |
| `resolveMany(hostnames)` | Resolve multiple hostnames in parallel |

## Permissions

```json
{ "permissions": ["dns"] }
```

## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
