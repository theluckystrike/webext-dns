# Contributing to webext-dns

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

## Development Setup

1. **Fork the repository**

   Click the "Fork" button on the GitHub page to create your own copy of the repository.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-dns.git
   cd webext-dns
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test --watch
```

### Building

```bash
pnpm build
```

The compiled JavaScript will be in the `dist/` directory.

## Making Changes

1. Make your changes in your feature branch
2. Add tests for new functionality
3. Ensure all tests pass
4. Commit your changes with a descriptive message
5. Push to your fork

## Submitting a Pull Request

1. Go to the [original repository](https://github.com/theluckystrike/webext-dns)
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template with:
   - Description of changes
   - Related issue number (if applicable)
   - Testing performed
5. Submit the PR

## Code Style

- Use TypeScript
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Ensure type safety

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
