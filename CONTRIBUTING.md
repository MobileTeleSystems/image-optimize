# Contributing to image-optimize

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the problem
- **Expected behavior** vs **actual behavior**
- **API request samples** that demonstrate the issue
- **Environment details** (Node.js version, Docker version, OS)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the enhancement
- **Use cases** and why it would be useful
- **Possible implementation** approach (if you have ideas)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** by running `npm test`
4. **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `chore:` for maintenance tasks
   - `refactor:` for code refactoring
5. **Push to your fork** and submit a pull request

## Development Setup

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or pnpm

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/image-optimize.git
cd image-optimize

# Install dependencies
npm install

# Run tests
npm test
```

## Coding Standards

This project uses ESLint and follows NestJS best practices. Key principles:

### Code Style

- **Line length**: Maximum 120 characters
- **Indentation**: 4 spaces
- **Quotes**: Use double quotes `"` or template literals `` ` ``
- **Semicolons**: Always use semicolons
- **Braces**: Always use braces for control structures

### Example

```typescript
// Good
if (condition) {
    doSomething();
}

const message = `Hello ${name}`;

// Bad
if (condition) doSomething();

const message = 'Hello ' + name;
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add support for new ESLint rule
fix: correct TypeScript configuration issue
docs: update README with new examples
chore: upgrade dependencies
```

## Testing

Before submitting your PR:

```bash
# Run linter
npm run lint

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Check for security vulnerabilities
npm audit
```

All tests must pass before your PR can be merged.

## Review Process

1. **Automated checks** run on every PR (tests, linting, security)
2. **Manual review** by maintainers
3. **Feedback** may be provided - please address comments
4. **Approval** - once approved, your PR will be merged

## Release Process

Releases are automated:

1. Maintainer merges PR to `main`
2. Version is bumped automatically
3. Changelog is generated
4. Docker image is published
5. GitHub release is created

## Questions?

- Open an issue with the `question` label
- Check existing issues and discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to image-optimize! 🎉
