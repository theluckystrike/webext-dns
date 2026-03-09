# Contributing to webext-dns

Thank you for your interest in contributing to webext-dns! This document outlines the process for contributing to this project.

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

## Getting Started

### 1. Fork the repository

Click the "Fork" button on the GitHub page to create your own copy of the repository.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/webext-dns.git
cd webext-dns
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

## Development

### Running tests

```bash
pnpm test
```

### Building

```bash
pnpm build
```

## Making Changes

1. Make your changes in your feature branch
2. Add tests for new functionality (if applicable)
3. Ensure all tests pass: `pnpm test`
4. Ensure the build succeeds: `pnpm build`

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a pull request against the `polish` branch of the original repository

3. Fill out the PR template with:
   - A clear description of your changes
   - Any related issues or PRs
   - Screenshots for UI changes (if applicable)

## Code Style

- Use TypeScript with strict mode enabled
- Follow the existing code style
- Write descriptive commit messages

## License

By contributing to webext-dns, you agree that your contributions will be licensed under the MIT License.
