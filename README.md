# webext-dns

A TypeScript-friendly wrapper for the Chrome DNS API.

## Installation

```bash
npm install webext-dns
```

## Usage

```typescript
import { DNS } from 'webext-dns';

// Resolve a hostname
try {
  const address = await DNS.resolve('example.com');
  console.log('IP address:', address);
} catch (error) {
  console.error('Failed to resolve:', error.message);
}

// Check if a hostname can be resolved
const canResolve = await DNS.canResolve('google.com');

// Resolve multiple hostnames
const results = await DNS.resolveMany(['google.com', 'github.com']);
```

## API

### `DNS.resolve(hostname)`
Resolves a hostname into an IP address. Returns a Promise that resolves with the IP address.

### `DNS.canResolve(hostname)`
Checks if a hostname can be resolved. Returns a Promise that resolves with a boolean.

### `DNS.resolveMany(hostnames)`
Resolves multiple hostnames in parallel. Returns a Promise that resolves with a Record of hostnames and their IP addresses (or null if resolution failed).

---

[zovo.one](https://zovo.one)
